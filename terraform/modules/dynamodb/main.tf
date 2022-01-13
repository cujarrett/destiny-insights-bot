resource "aws_dynamodb_table" "destiny_insights_items" {
  name           = "destiny-insights-items"
  billing_mode   = "PROVISIONED"
  read_capacity  = 10
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

  attribute {
    name = "source"
    type = "S"
  }

  attribute {
    name = "roll"
    type = "S"
  }

  global_secondary_index {
    name            = "timestamp"
    hash_key        = "timestamp"
    write_capacity  = 2
    read_capacity   = 5
    projection_type = "ALL"
  }

  global_secondary_index {
    name            = "type"
    hash_key        = "type"
    write_capacity  = 2
    read_capacity   = 5
    projection_type = "ALL"
  }

  global_secondary_index {
    name            = "name"
    hash_key        = "name"
    write_capacity  = 2
    read_capacity   = 5
    projection_type = "ALL"
  }

  global_secondary_index {
    name            = "source"
    hash_key        = "source"
    write_capacity  = 2
    read_capacity   = 5
    projection_type = "ALL"
  }

  global_secondary_index {
    name            = "roll"
    hash_key        = "roll"
    write_capacity  = 2
    read_capacity   = 5
    projection_type = "ALL"
  }

  lifecycle {
    prevent_destroy = true
  }
}

output "destiny_insights_items_arn" {
  value = aws_dynamodb_table.destiny_insights_items.arn
}
