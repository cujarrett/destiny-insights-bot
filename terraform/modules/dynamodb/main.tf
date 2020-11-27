resource "aws_dynamodb_table" "banshee-44-mods-bot" {
  name           = "banshee-44-mods-bot"
  billing_mode   = "PROVISIONED"
  read_capacity  = 10
  write_capacity = 10
  hash_key       = "timestamp"

  point_in_time_recovery {
    enabled = true
  }

  attribute {
    name = "timestamp"
    type = "S"
  }

  attribute {
    name = "mod1"
    type = "S"
  }

  attribute {
    name = "mod2"
    type = "S"
  }

  global_secondary_index {
    name               = "mod1"
    hash_key           = "mod1"
    write_capacity     = 5
    read_capacity      = 5
    projection_type    = "ALL"
  }

  global_secondary_index {
    name               = "mod2"
    hash_key           = "mod2"
    write_capacity     = 5
    read_capacity      = 5
    projection_type    = "ALL"
  }

  lifecycle {
    prevent_destroy = true
  }
}

output "aws-dynamodb-table-banshee-44-mods-bot-arn" {
  value = aws_dynamodb_table.banshee-44-mods-bot.arn
}
