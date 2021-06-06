resource "aws_dynamodb_table" "destiny_insights_mods" {
  name           = "destiny-insights-mods"
  billing_mode   = "PROVISIONED"
  read_capacity  = 15
  write_capacity = 2
  hash_key       = "key"

  point_in_time_recovery {
    enabled = true
  }

  attribute {
    name = "key"
    type = "S"
  }

  attribute {
    name = "timestamp"
    type = "S"
  }

  attribute {
    name = "type"
    type = "S"
  }

  attribute {
    name = "name"
    type = "S"
  }

  global_secondary_index {
    name               = "timestamp"
    hash_key           = "timestamp"
    write_capacity     = 2
    read_capacity      = 2
    projection_type    = "ALL"
  }

  global_secondary_index {
    name               = "type"
    hash_key           = "type"
    write_capacity     = 2
    read_capacity      = 2
    projection_type    = "ALL"
  }

  global_secondary_index {
    name               = "name"
    hash_key           = "name"
    write_capacity     = 2
    read_capacity      = 2
    projection_type    = "ALL"
  }

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_dynamodb_table" "destiny_insights_xur" {
  name           = "destiny-insights-xur"
  billing_mode   = "PROVISIONED"
  read_capacity  = 2
  write_capacity = 2
  hash_key       = "key"

  point_in_time_recovery {
    enabled = true
  }

  attribute {
    name = "key"
    type = "S"
  }

  attribute {
    name = "timestamp"
    type = "S"
  }

  attribute {
    name = "type"
    type = "S"
  }

  attribute {
    name = "name"
    type = "S"
  }

  global_secondary_index {
    name               = "timestamp"
    hash_key           = "timestamp"
    write_capacity     = 2
    read_capacity      = 2
    projection_type    = "ALL"
  }

  global_secondary_index {
    name               = "type"
    hash_key           = "type"
    write_capacity     = 2
    read_capacity      = 2
    projection_type    = "ALL"
  }

  global_secondary_index {
    name               = "name"
    hash_key           = "name"
    write_capacity     = 2
    read_capacity      = 2
    projection_type    = "ALL"
  }

  lifecycle {
    prevent_destroy = true
  }
}

output "destiny_insights_mods_arn" {
  value = aws_dynamodb_table.destiny_insights_mods.arn
}

output "destiny_insights_xur_arn" {
  value = aws_dynamodb_table.destiny_insights_xur.arn
}
