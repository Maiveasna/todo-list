


<p align="center">
    <img width="75" src="https://v-tech-rho.vercel.app/_next/image?url=%2Fassets%2Ficon-vpost24.png&w=48&q=75" alt="logo">
</p>

<p align="center">
    V-POST TODO
</p>


## Overviwe

Dello Dear,

I'm Mai Veasna, Currently, I'm a full-stack developer, and I grew up in the beautiful world 😁.I make this project for a simple todo list and open source for sharing with those who want to test.The below section will show about instruction to use that project. 

Have fun and happy coding! 😁😁

## Getting Started


#### source 
 
 > ```javascript
> https://github.com/Maiveasna/v_tech
> ```

  #### url for test 
 
 > ```javascript
> https://v-tech-rho.vercel.app/
> ```


  ####  base url 
 
 > ```javascript
> https://v-tech-rho.vercel.app
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


#### get todo list

<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>${base_url}/api/todo</code></summary>

##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | limit      |  none |   number    | N/A  |
> | filter      |  none |  boolean    | N/A  |


##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`       |  `{  "data" : "Array JSON", "meta" :  "JSON" , "link" :"JSON" }`                                 |


##### Example cURL

> ```javascript
> ${base_url}/api/todo
> ```

</details>



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
>  ${base_url}/api/todo
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
>   ${base_url}/api/todo/${id}
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
> ${base_url}/api/todo/${id}
> ```

</details>


## Technology


## Authors

- [@maiveasna](https://www.linkedin.com/in/mai-veasna-61412919a/)
