// Copyright IBM Corp. and LoopBack contributors 2020. All Rights Reserved.
// Node module: @loopback/example-todo-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Todo, TodoRelations, Customer} from '../models';
import {CustomerRepository} from './customer.repository';

export class TodoRepository extends DefaultCrudRepository<
  Todo,
  typeof Todo.prototype.id,
  TodoRelations
> {

  public readonly todo: BelongsToAccessor<Customer, typeof Todo.prototype.id>;

  constructor(@inject('datasources.db') dataSource: DbDataSource, @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>,) {
    super(Todo, dataSource);
    this.todo = this.createBelongsToAccessorFor('todo', customerRepositoryGetter,);
    this.registerInclusionResolver('todo', this.todo.inclusionResolver);
  }
}
