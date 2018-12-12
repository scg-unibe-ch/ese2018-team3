# Job Search

The backend currently provides 2 search methods: 
- `/search/:title` for a quick way of searching for occurrences in the job title **(to be removed in the future)**
- `/search` with a full request body

<hr>

### Backend
This uses following format to be able to search across many fields in the `JobModel` (except `start`, `endTime` etc. ):

```javascript
const query = {
    company: string,
    title: string,
    description: string,
    occupation: string,
    qualifications: string,
    remarks: string,
    salary: string,
    contact: string
};
```

Currently, we only use the `LIKE` operator, as `ILIKE` works only for PG dialect. 

## Frontend
The frontend should provide two ways of searching: 
- **simple form**, which fills out the extended form by itself
- **extended form**, which should (must) use the above code snippet in the request body. 

As the `GET` method for http requests isn't able to have a body, the backend may be reached with the `POST` request. 