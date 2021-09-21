const express = require("express");
const res = require("express/lib/response");
const mongoose = require("mongoose");

const connect = async () => {
  return await mongoose.connect(" mongodb://127.0.0.1:27017/library", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};

const sectionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    
    
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Section = mongoose.model("section", sectionSchema);
//post model
const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "section",
      required: true,
    },
    authorId: 
      // { type: mongoose.Schema }
      { type: mongoose.Schema.Types.ObjectId, ref: "author", required: true },
    
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Book = mongoose.model("book", bookSchema);

//comment model

const authorSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
   
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const Author = mongoose.model("author", authorSchema);


const app = express();
app.use(express.json());
// CRUD operations

//-> For User

app.post("/sections", async (req, res) => {
  const user = await Section.create(req.body);

  return res.status(201).json({ user });
});

// get all user

app.get("/sections", async (req, res) => {
  const section = await Section.find().lean().exec();
  return res.status(200).json({ section });
});
app.get("/sections/:id", async (req, res) => {
  const section = await Section.findById(req.params.id).lean().exec();
  return res.status(200).json({ section });
});
app.delete("/sections:/id", async (req, res) => {
  const section = await Section.findByIdAndDelete(req.params.id);
  return res.status(200).json({ section });
});

// crud operation for tag

app.post("/books", async (req, res) => {
  const tag = await Book.create(req.body);
  return res.status(200).json({ tag });
});

app.get("/books", async (req, res) => {
  const tags = await Book.find().populate("authorId").populate("sectionId").lean().exec();
  return res.status(200).json({ tags });
});

app.get("/books/:id", async (req, res) => {
  const tags = await Book.findById(req.params.id).populate("authorId").populate("sectionId").lean().exec();
  return res.status(200).json({ tags });
});
app.patch("/books/:id", async (req, res) => {
  const tags = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .lean()
    .exec();
  return res.status(200).json({ tags });
});
app.delete("/books/:id", async (req, res) => {
  const tags = await Book.findByIdAndDelete(req.params.id);
  return res.status(200).json({ tags });
});

//crud operation for post
//create a post

app.post("/authors", async (req, res) => {
  const post = await Author.create(req.body);
  return res.status(201).json({ post });
});
app.get("/authors", async (req, res) => {
  const post = await Author.find()

    .lean()
    .exec();
  return res.status(200).json({ post });
});
app.get("/authors/:id", async (req, res) => {
     const author = await Author.findById(req.params._id).lean().exec()
    
  return res.status(200).json({ author });
});
app.patch("/authors/:id", async (req, res) => {
  const post = await Author.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.status(200).json({ post });
});
app.delete("/authors/:id", async (req, res) => {
  const post = await Author.findByIdAndDelete(req.params.id);
  return res.status(200).json({ post });
});

//crud for comment



// get all book for a section

app.get("/sections/:id/books", async (req, res) => {
  const comments = await Book.find({ sectionId:{_id:req.params.id}  }).lean().exec();
  const post = await Section.findById(req.params.id).lean().exec();

  return res.status(200).json({ comments, post });
});

app.listen(9001, async () => {
  await connect();
  console.log("listening to port 9001");
});
