package storages

// Adapter Minio
type MinioAdapter struct{}

func NewMinioAdapter() *MinioAdapter {
	return &MinioAdapter{}
}

func (m *MinioAdapter) UploadFile(fileName string, content []byte) error {
	// Code upload lên Minio
	return nil
}

func (m *MinioAdapter) DeleteFile(fileName string) error {
	// Code delete file trên Minio
	return nil
}

func (m *MinioAdapter) DownloadFile(fileName string) ([]byte, error) {
	// Code download file từ Minio
	return nil, nil
}

// Adapter Hadoop
type HadoopAdapter struct{}

func NewHadoopAdapter() *HadoopAdapter {
	return &HadoopAdapter{}
}

func (h *HadoopAdapter) UploadFile(filePath, fileName string) error {
	// Code upload lên Hadoop
	return nil
}

func (h *HadoopAdapter) DeleteFile(fileName string) error {
	// Code delete file trên Hadoop
	return nil
}

func (h *HadoopAdapter) DownloadFile(fileName string) ([]byte, error) {
	// Code download file từ Hadoop
	return nil, nil
}

// Adapter S3
type S3Adapter struct{}

func NewS3Adapter() *S3Adapter {
	return &S3Adapter{}
}

func (s *S3Adapter) UploadFile(fileName string, content []byte) error {
	// Code upload lên S3
	return nil
}

func (s *S3Adapter) DeleteFile(fileName string) error {
	// Code delete file trên S3
	return nil
}

func (s *S3Adapter) DownloadFile(fileName string) ([]byte, error) {
	// Code download file từ S3
	return nil, nil
}
