package main

import (
	//	"context"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	//	"go.mongodb.org/mongo-driver/mongo"
	//	"go.mongodb.org/mongo-driver/mongo/options"
	//	"go.mongodb.org/mongo-driver/mongo/readpref"
	//"go.mongodb.org/mongo-driver/bson"
	//	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"time"
)

type Block struct {
	Index        int
	Timestamp    string
	Data         string
	PreviousHash string
	Hash         string
}

func calculateHash(b Block) string {
	record := strconv.Itoa(b.Index) + b.Timestamp + b.Data + b.PreviousHash
	h := sha256.New()
	h.Write([]byte(record))
	hashed := h.Sum(nil)
	return hex.EncodeToString(hashed)
}
func generateBlock(oldBlock Block, data string) (Block, error) {
	var newBlock Block

	t := time.Now()

	newBlock.Index = oldBlock.Index + 1
	newBlock.Timestamp = t.String()
	newBlock.Data = data
	newBlock.PreviousHash = oldBlock.Hash
	newBlock.Hash = calculateHash(newBlock)

	return newBlock, nil
}
func isBlockValid(newBlock, oldBlock Block) bool {
	if oldBlock.Index+1 != newBlock.Index {
		return false
	}
	if oldBlock.Hash != newBlock.PreviousHash {
		return false
	}
	if calculateHash(newBlock) != newBlock.Hash {
		return false
	}
	return true
}
func main() {
	//connectToDatabse()
	genesisBlock := Block{}
	genesisBlock = Block{0, time.Now().String(), "Genesis Block", "", ""}
	genesisBlock.Hash = calculateHash(genesisBlock)
	r := gin.Default()
	r.GET("/vote", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
		tempblock, err := generateBlock(genesisBlock, "next block")
		if err != nil {
			fmt.Println("invalid vote")
		}
		fmt.Println(tempblock)
	})
	r.Run("localhost:8080")

	secondBlock, _ := generateBlock(genesisBlock, "Second Block Data")
	fmt.Println(secondBlock)

	// dbconnection()
}

//func dbconnection() {
// Use the SetServerAPIOptions() method to set the version of the Stable API on the client
//	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
//	opts := options.Client().ApplyURI("mongodb+srv://admin:admin123@cluster0.mjpfx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").SetServerAPIOptions(serverAPI)
//	// Create a new client and connect to the server
//	client, err := mongo.Connect(context.TODO(), opts)
//	if err != nil {
//		panic(err)
//	}
//	defer func() {
//		if err = client.Disconnect(context.TODO()); err != nil {
//			panic(err)
//		}
//	}()
//	testblock, _ := generateBlock(genesisBlock, "third block data")
//	collection := client.Database("demod").Collection("blockchain")
//	_, err = collection.InsertOne(context.TODO(), testblock)
//	if err != nil {
//		fmt.Println("error inserting data")
//	}
//	// Send a ping to confirm a successful connection
//
//	//err = client.Ping(ctx, readpref.Primary())
//	//if err != nil {
//	//	panic(err)
//	//}
//	fmt.Println("Pinged your deployment. You successfully connected to MongoDB!")
//}
