data "archive_file" "placeholder" {
  type = "zip"
  output_path = "${path.root}/lambda-function-payload.zip"

  source {
    content = "placeholder"
    filename = "placeholder.txt"
  }
}

output "data_archive_file_placeholder_output_path" {
  value = data.archive_file.placeholder.output_path
}
