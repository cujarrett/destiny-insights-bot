data "archive_file" "placeholder" {
  type = "zip"
  output_path = "${path.root}/lambda-function-payload.zip"

  source {
    content = "placeholder"
    filename = "placeholder.txt"
  }
}

output "data-archive-file-placeholder-output-path" {
  value = data.archive_file.placeholder.output_path
}
