resource "aws_dynamodb_table" "destiny_insights_items" {
  name           = "destiny-insights-items"
  billing_mode   = "PROVISIONED"
  read_capacity  = 3
  write_capacity = 1
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
    name = "name"
    type = "S"
  }

  attribute {
    name = "source"
    type = "S"
  }

  global_secondary_index {
    name            = "timestamp"
    hash_key        = "timestamp"
    read_capacity   = 1
    write_capacity  = 1
    projection_type = "ALL"
  }

  global_secondary_index {
    name            = "name"
    hash_key        = "name"
    read_capacity   = 1
    write_capacity  = 1
    projection_type = "ALL"
  }

  global_secondary_index {
    name            = "source"
    hash_key        = "source"
    read_capacity   = 1
    write_capacity  = 1
    projection_type = "ALL"
  }
}

output "destiny_insights_items_arn" {
  value = aws_dynamodb_table.destiny_insights_items.arn
}
