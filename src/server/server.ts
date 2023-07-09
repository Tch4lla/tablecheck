import axios from "axios";
import express from "express";

import { env } from "../env";

type Post = {
  id: string;
  title: string;
  body: string;
  userId: string;
};

const instance = axios.create({
  baseURL: env.API_URL,
});

export const server = express().get("/:id", async (req, res) => {
  const { data: posts } = await instance.get<Post[]>("/posts");
  const { data: post } = await instance.get<Post>(`/posts/${req.params.id}`);

  res.send(`
    <!doctype html>
    <html>
      <head>
        <link rel="shortcut icon" href="https://cdn0.tablecheck.com/common/images/favicons/tc/v1.0.0/apple-icon-precomposed.png" type="image/x-icon" />
        <title>Posts</title>
      </head>
      <body>
        <h2>Post</h2>
        <div data-testid="Single Post">
          <h3 data-testid="Post Title">${post.title}</h3>
          <p data-testid="Post Body">${post.body}</p>
          <p data-testid="Post Author">Author: ${post.userId}</p>

        </div>
        <h2>Posts</h2>
        <ul data-testid="Posts">
          ${posts
            .map(
              ({
                id,
                title,
                body,
                userId,
              }) => `<li data-testid="Post" data-post-id="${id}">
            <h3 data-testid="Post Title">${title}</h3>
            <p data-testid="Post Body">${body}</p>
            <p data-testid="Post Author">Author: ${userId}</p>
          </li>`
            )
            .join("")}
        </ul>
      </body>
    </html>
    `);
})
.get("/custom", async (req, res) => {
  try {
    const { data: post } = await axios.get('http://localhost:9001/api/custom');
    res.send(`
      <!doctype html>
      <html>
        <head>
          <link rel="shortcut icon" href="https://cdn0.tablecheck.com/common/images/favicons/tc/v1.0.0/apple-icon-precomposed.png" type="image/x-icon" />
          <title>Posts</title>
        </head>
        <body>
          <h2>Post</h2>
          <div data-testid="Single Post">
            <h3 data-testid="Post Title">${post.title}</h3>
            <p data-testid="Post Body">${post.body}</p>
            <p data-testid="Post Author">Author: ${post.userId}</p>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
})