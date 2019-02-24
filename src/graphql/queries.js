// eslint-disable
// this is an auto generated file. This will be overwritten

export const getTodo = `query GetTodo($id: ID!) {
  getTodo(id: $id) {
    id
    user
    item
    image
    serving_size
    calories
    total_fat
    sodium
    carbs
    sugars
    protein
  }
}
`;
export const listTodos = `query ListTodos(
  $filter: ModelTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      user
      item
      image
      serving_size
      calories
      total_fat
      sodium
      carbs
      sugars
      protein
    }
    nextToken
  }
}
`;
