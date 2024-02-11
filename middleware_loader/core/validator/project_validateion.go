package validator

import (
	"fmt"
	request_dtos "middleware_loader/core/domain/dtos/request"
	"middleware_loader/core/domain/enums"
	"middleware_loader/infrastructure/graph/model"
	"strconv"
)

type ProjectValidator struct {
	CreateProjectRequestDTO request_dtos.CreateProjectRequestDTO
}

func NewProjectDTOValidator() *ProjectValidator {
	return &ProjectValidator{}
}

func (in *ProjectValidator) CreateProjectValidate(input model.CreateProjectInput) error {
	if input.Name == "" {
		return fmt.Errorf("%w: name is required", enums.ErrValidation)
	}

	if input.Owner == "" {
		return fmt.Errorf("%w: owner is required", enums.ErrValidation)
	}

	if _, err := strconv.Atoi(input.Owner); err != nil {
		return fmt.Errorf("%w: owner must be digit", enums.ErrValidation)
	}

	return nil
}