package services

import (
	"middleware_loader/infrastructure/repository"
)

type URLPermissionService struct {
	Repository repository.URLPermissionConfigurationRepository
}

func NewURLPermission(repo repository.URLPermissionConfigurationRepository) *URLPermissionService {
	return &URLPermissionService{repo}
}

func (s *URLPermissionService) GetURLPermission() (string, error) {
	return "nil", nil
}