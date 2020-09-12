resource "aws_dynamodb_table" "banshee-44-mods-bot" {
  name           = "banshee-44-mods-bot"
  billing_mode   = "PROVISIONED"
  read_capacity  = 20
  write_capacity = 20
  hash_key       = "timestamp"

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
    write_capacity     = 10
    read_capacity      = 10
    projection_type    = "ALL"
  }

  global_secondary_index {
    name               = "mod2"
    hash_key           = "mod2"
    write_capacity     = 10
    read_capacity      = 10
    projection_type    = "ALL"
  }
}

output "aws-dynamodb-table-banshee-44-mods-bot-arn" {
  value = aws_dynamodb_table.banshee-44-mods-bot.arn
}
