// models là schema

const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  content: String,
  // isCompleted: Boolean,
  // Làm mặc định cho isCompleted thì :
  isCompleted: {
    type: Boolean,
    default: false,
  }, // có nghĩa là nếu ko post cái isCompleted thì mặc định nó sẽ là False
});

// Tạo model -> bên trong 'tên model' => Khi tạo tên model thì nó sẽ tự động tạo 1 cái Collection
// Sẽ tự động tạo ra -> collection : todos
module.exports = mongoose.model("Todo", todoSchema);
// Todo là tên model -> khi để tên thì sẽ tự động tạo 1 collection thêm s
