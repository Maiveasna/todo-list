
## Getting Started


#### source 
 
 > ```javascript
> https://github.com/Maiveasna/v_tech
> ```

  #### url for test 
 
 > ```javascript
> https://v-tech-rho.vercel.app/
> ```

  
  
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


</br>

## CRUD APIs

#### Creating new todo

<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>${base_url}/api/todo</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | uuid      |  required |  uuid   | N/A  |
> | todo      |  required |  string    | N/A  |
> | isCompleted      |  required |  string   | N/A  |
> | createdAt      |  required |  timestamp  | N/A  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `application/json`       |  `{"code":"201","message":" Created successfully" , "data" : "JSON"}`                                 |
> | `400`         | `application/json`                | `{"code":"400","message":"Bad Request"}`                            |
> | `405`         | `text/html;charset=utf-8`         | None                                                                |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" --data @post.json  ${base_url}/api/todo
> ```

</details>


#### Updating Todo

<details>
  <summary><code>PUT</code> <code><b>${base_url}/api/todo/{id}</b></code> </summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | todo      |  required |  string    | N/A  |
> | isCompleted      |  required |  string   | N/A  |



##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `201`         | `application/json`     | `{ message : "Updated successfully"}`        |
> | `400`         | `application/json`                | `{"code":"400","message":"Bad Request"}`                            |
> | `405`         | `text/html;charset=utf-8`         | None                                                                |

##### Example cURL

> ```javascript
>  curl -X PUT -H "Content-Type: application/json" --data @put.json   ${base_url}/api/todo/${id}
> ```

</details>

#### Delete todo

<details>
  <summary><code>DELETE</code> <code><b>/api/todo/{id}</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | uuid      |  required |  uuid   | N/A  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`     | `{ message : "Delete successfully"}`        |

##### Example cURL

> ```javascript
>  curl -X DELETE -H "Content-Type: application/json"  ${base_url}/api/todo/${id}
> ```

</details>