import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Todo,
  Customer,
} from '../models';
import {TodoRepository} from '../repositories';

export class TodoCustomerController {
  constructor(
    @repository(TodoRepository)
    public todoRepository: TodoRepository,
  ) { }

  @get('/todos/{id}/customer', {
    responses: {
      '200': {
        description: 'Customer belonging to Todo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Customer)},
          },
        },
      },
    },
  })
  async getCustomer(
    @param.path.number('id') id: typeof Todo.prototype.id,
  ): Promise<Customer> {
    return this.todoRepository.todo(id);
  }
}
