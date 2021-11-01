import { AggregateRoot } from 'src/framework/aggregate-root';
import { UniqueEntityID } from 'src/framework/unique-entity-id';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeskProps {}

export class Desk extends AggregateRoot<DeskProps> {
  private constructor(props: DeskProps, id?: UniqueEntityID) {
    super(props, id);
  }
}
