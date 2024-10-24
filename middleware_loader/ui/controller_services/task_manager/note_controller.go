package controller_services

import (
	"encoding/json"
	"log"
	base_dtos "middleware_loader/core/domain/dtos/base"
	mapper "middleware_loader/core/port/mapper/request"
	services "middleware_loader/core/services/task_manager"
	"middleware_loader/infrastructure/graph/model"
	"middleware_loader/kernel/utils"
	"middleware_loader/ui/controller_services/controller_utils"
	"net/http"

	"github.com/go-chi/chi"
)

func GetAllNotes(w http.ResponseWriter, r *http.Request, noteService *services.NoteService) {
	userId := chi.URLParam(r, "userId")
	input := mapper.GetId(userId)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{FunctionName: "getAllNotes", QueryInput: input, QueryOutput: model.Note{}})
	graphQuery := utils.GenerateGraphQLQueryWithMultipleFunction("query", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphQuery)	
}

func CreateNote(w http.ResponseWriter, r *http.Request, noteService *services.NoteService) {
	filePath, fileObject, err := controller_utils.ReceiveMultipartFile(r, w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	log.Println("File path:", filePath)

	input, err := mapper.CreateNoteRequestDTOMapper(r, fileObject)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	log.Println("Input:", input)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{FunctionName: "createNote", QueryInput: input, QueryOutput: model.Note{}})
	graphQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphQuery)
}

func UpdateNote(w http.ResponseWriter, r *http.Request, noteService *services.NoteService) {
	var body map[string]interface{}
	body, err := controller_utils.MappingBody(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	noteId := chi.URLParam(r, "id")
	input := mapper.UpdateNoteRequestDTOMapper(body, noteId)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{FunctionName: "updateNote", QueryInput: input, QueryOutput: model.Note{}})
	graphQuery := utils.GenerateGraphQLQueryWithMultipleFunction("mutation", graphqlQueryModel)

	utils.ConnectToGraphQLServer(w, graphQuery)
}

func GetNoteById(w http.ResponseWriter, r *http.Request, noteService *services.NoteService) {
	noteId := chi.URLParam(r, "id")
	input := mapper.GetId(noteId)

	graphqlQueryModel := []base_dtos.GraphQLQuery{}
	graphqlQueryModel = append(graphqlQueryModel, base_dtos.GraphQLQuery{FunctionName: "getNote", QueryInput: input, QueryOutput: model.Note{}})
	graphQuery := utils.GenerateGraphQLQueryWithMultipleFunction("query", graphqlQueryModel)

	tmResponse := utils.GraphQLResponse(w, graphQuery)

	// handle UploadFile 
	finalResponse := noteService.GetNoteFiles(noteId, tmResponse)
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(finalResponse); err != nil {
		log.Printf("Error encoding final response: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}