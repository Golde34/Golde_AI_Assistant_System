package route 

import (
	services "middleware_loader/core/services/graphql_service"
	"middleware_loader/infrastructure/graph"
	database_mongo "middleware_loader/kernel/database/mongo"
	"middleware_loader/ui/routers"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi"
)

func Setup(router *chi.Mux, db database_mongo.Database) {

	// SERVICES
	authService := services.NewAuthService()
	gaiaService := services.NewGaiaService()
	taskService := services.NewTaskService()
	projectService := services.NewProjectService()

	// GRAPHQL FEDERATION
	router.Handle("/graphql", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", handler.NewDefaultServer(
		graph.NewExecutableSchema(
			graph.Config{
				Resolvers: &graph.Resolver{
					AuthGraphQLService:    authService,
					TaskGraphQLService:    taskService,
					ProjectGraphQLService: projectService,
				},
			},
		),
	))

	// ROUTERS
	routers.NewMicroserviceRouter(db, router)
	routers.NewURLPermissionRouter(db, router)

	// Auth Routers
	router.Group(func(r chi.Router) {
		r.Use(CheckMicroserviceStatusMiddleware(router, db, "AUTH_SERVICE"))
		routers.NewAuthRouter(authService, router)
	})

	// Gaia Routers
	router.Group(func(r chi.Router) {
		r.Use(CheckMicroserviceStatusMiddleware(router, db, "GAIA_SERVICE"))
		routers.NewGaiaRouter(gaiaService, router)
	})

	// Task Manager Routers
	router.Group(func(r chi.Router) {
		r.Use(CheckMicroserviceStatusMiddleware(router, db, "TASK_MANAGER_SERVICE"))
		routers.NewTaskRouter(taskService, router)
		routers.NewProjectRouter(projectService, router)
	})
}