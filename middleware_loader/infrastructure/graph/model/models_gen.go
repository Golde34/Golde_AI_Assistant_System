// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type AuthToken struct {
	ID         string `json:"id"`
	Token      string `json:"token"`
	TokenType  string `json:"tokenType"`
	ExpiryDate string `json:"expiryDate"`
	User       *User  `json:"user"`
}

type AuthTokenResponse struct {
	AccessToken  string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
	Name         string `json:"name"`
	Username     string `json:"username"`
	Email        string `json:"email"`
	LastLogin    string `json:"lastLogin"`
	BossType     string `json:"bossType"`
	Role         string `json:"role"`
	GaiaHealth   string `json:"gaiaHealth"`
}

type Comment struct {
	ID           string `json:"id"`
	Content      string `json:"content"`
	ActiveStatus string `json:"activeStatus"`
	CreatedAt    string `json:"createdAt"`
	UpdatedAt    string `json:"updatedAt"`
	Task         string `json:"task"`
}

type CreateProjectInput struct {
	Name         string `json:"name"`
	Description  string `json:"description"`
	Status       string `json:"status"`
	Color        string `json:"color"`
	OwnerID      string `json:"ownerId"`
	ActiveStatus string `json:"activeStatus"`
}

type CreateTaskInput struct {
	Title        string   `json:"title"`
	Description  string   `json:"description"`
	Priority     []string `json:"priority"`
	Status       string   `json:"status"`
	StartDate    string   `json:"startDate"`
	Deadline     string   `json:"deadline"`
	Duration     string   `json:"duration"`
	ActiveStatus string   `json:"activeStatus"`
	GroupTaskID  string   `json:"groupTaskId"`
}

type CreateUserInput struct {
	Name             string `json:"name"`
	Username         string `json:"username"`
	Email            string `json:"email"`
	Password         string `json:"password"`
	MatchingPassword string `json:"matchingPassword"`
}

type GenerateTaskWithoutGroupTaskInput struct {
	Title        string   `json:"title"`
	Description  string   `json:"description"`
	Priority     []string `json:"priority"`
	Status       string   `json:"status"`
	StartDate    string   `json:"startDate"`
	Deadline     string   `json:"deadline"`
	Duration     string   `json:"duration"`
	ActiveStatus string   `json:"activeStatus"`
	ProjectID    string   `json:"projectId"`
}

type GroupTask struct {
	ID             string   `json:"id"`
	Title          string   `json:"title"`
	Description    string   `json:"description"`
	Priority       []string `json:"priority"`
	Status         string   `json:"status"`
	OrdinalNumber  string   `json:"ordinalNumber"`
	ActiveStatus   string   `json:"activeStatus"`
	Project        string   `json:"project"`
	Tasks          []string `json:"tasks"`
	TotalTasks     int      `json:"totalTasks"`
	CompletedTasks int      `json:"completedTasks"`
	CreatedAt      string   `json:"createdAt"`
	UpdatedAt      string   `json:"updatedAt"`
}

type IDInput struct {
	ID string `json:"id"`
}

type MoveTaskInput struct {
	OldGroupTaskID string `json:"oldGroupTaskId"`
	NewGroupTaskID string `json:"newGroupTaskId"`
	TaskID         string `json:"taskId"`
}

type Privilege struct {
	ID   string  `json:"id"`
	Name string  `json:"name"`
	Role []*Role `json:"role"`
}

type PrivilegeInput struct {
	ID   *string `json:"id,omitempty"`
	Name string  `json:"name"`
}

type Project struct {
	ID           string   `json:"id"`
	Name         string   `json:"name"`
	Description  string   `json:"description"`
	Status       string   `json:"status"`
	Color        string   `json:"color"`
	ActiveStatus string   `json:"activeStatus"`
	GroupTasks   []string `json:"groupTasks"`
	OwnerID      float64  `json:"ownerId"`
	CreatedAt    string   `json:"createdAt"`
	UpdatedAt    string   `json:"updatedAt"`
}

type Role struct {
	ID        string       `json:"id"`
	Name      string       `json:"name"`
	Privilege []*Privilege `json:"privilege"`
	User      []*User      `json:"user"`
}

type RoleInput struct {
	ID   *string `json:"id,omitempty"`
	Name string  `json:"name"`
}

type SigninInput struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type SubTask struct {
	ID           string   `json:"id"`
	Mission      string   `json:"mission"`
	Deadline     string   `json:"deadline"`
	Priority     []string `json:"priority"`
	Status       string   `json:"status"`
	ActiveStatus string   `json:"activeStatus"`
	CreatedAt    string   `json:"createdAt"`
	UpdatedAt    string   `json:"updatedAt"`
	Task         string   `json:"task"`
}

type Task struct {
	ID           string   `json:"id"`
	Title        string   `json:"title"`
	Description  string   `json:"description"`
	Priority     []string `json:"priority"`
	Status       string   `json:"status"`
	StartDate    string   `json:"startDate"`
	Deadline     string   `json:"deadline"`
	Duration     string   `json:"duration"`
	ActiveStatus string   `json:"activeStatus"`
	CreatedAt    string   `json:"createdAt"`
	UpdatedAt    string   `json:"updatedAt"`
	GroupTask    string   `json:"groupTask"`
	SubTasks     []string `json:"subTasks"`
	Comments     []string `json:"comments"`
}

type TokenInput struct {
	Token string `json:"token"`
}

type TokenResponse struct {
	ID          string `json:"id"`
	Username    string `json:"username"`
	AccessToken string `json:"accessToken"`
	ExpiryDate  string `json:"expiryDate"`
}

type UpdateColorInput struct {
	ID    string `json:"id"`
	Color string `json:"color"`
}

type UpdateObjectNameInput struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type UpdateProjectInput struct {
	ProjectID    string `json:"projectId"`
	Name         string `json:"name"`
	Description  string `json:"description"`
	Status       string `json:"status"`
	Color        string `json:"color"`
	OwnerID      string `json:"ownerId"`
	ActiveStatus string `json:"activeStatus"`
}

type UpdateTaskInDialogInput struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Status      string `json:"status"`
	TaskID      string `json:"taskId"`
}

type UpdateTaskInput struct {
	Title        string   `json:"title"`
	Description  string   `json:"description"`
	Priority     []string `json:"priority"`
	Status       string   `json:"status"`
	StartDate    string   `json:"startDate"`
	Deadline     string   `json:"deadline"`
	Duration     string   `json:"duration"`
	ActiveStatus string   `json:"activeStatus"`
	TaskID       string   `json:"taskId"`
}

type User struct {
	ID         string       `json:"id"`
	Name       string       `json:"name"`
	Username   string       `json:"username"`
	Email      string       `json:"email"`
	Password   string       `json:"password"`
	Enabled    bool         `json:"enabled"`
	IsUsing2fa bool         `json:"isUsing2FA"`
	Secret     string       `json:"secret"`
	Roles      []*Role      `json:"roles"`
	AuthTokens []*AuthToken `json:"authTokens"`
}

type UserInput struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

type UserPermissionInput struct {
	UserID       string `json:"userId"`
	PermissionID string `json:"permissionId"`
}

type UserPermissionResponse struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}
