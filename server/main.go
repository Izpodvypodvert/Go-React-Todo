package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"log"
)

type Todo struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Done  bool   `json:"done"`
	Body  string `json:"body"`
}

func main() {

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	var todos []Todo
	var id int

	app.Get("/healthcheck", func(ctx *fiber.Ctx) error {
		return ctx.SendString("OK")
	})

	app.Post("/api/todos", func(ctx *fiber.Ctx) error {
		todo := &Todo{}
		if err := ctx.BodyParser(todo); err != nil {
			return err
		}
		todo.ID = id
		id++
		todos = append(todos, *todo)
		return ctx.JSON(todos)
	})

	app.Patch("/api/todos/:id/done", func(ctx *fiber.Ctx) error {
		id, err := ctx.ParamsInt("id")
		if err != nil {
			return ctx.Status(401).SendString("Invalid id")
		}

		for i, todo := range todos {
			if todo.ID == id {
				todos[i].Done = !todos[i].Done
				break
			}
		}

		return ctx.JSON(todos)
	})

	app.Get("/api/todos", func(ctx *fiber.Ctx) error {
		return ctx.JSON(todos)
	})

	app.Delete("/api/todos/:id/delete", func(ctx *fiber.Ctx) error {
		id, err := ctx.ParamsInt("id")
		if err != nil {
			return ctx.Status(401).SendString("Invalid id")
		}

		for i, todo := range todos {
			if todo.ID == id {
				todos = remove(todos, i)
				break
			}
		}

		return ctx.JSON(todos)
	})

	log.Fatal(app.Listen(":4000"))
}

func remove(slice []Todo, s int) []Todo {
	return append(slice[:s], slice[s+1:]...)
}
