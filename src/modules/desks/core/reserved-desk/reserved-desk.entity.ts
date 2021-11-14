import { Entity } from '../../../../framework/entity';
import { UniqueEntityID } from '../../../../framework/unique-entity-id';

interface ReservedDeskProps {
  deskId: UniqueEntityID;
}

export interface PersistedReservedDesk {
  id: string;
  deskId: string;
}

export class ReservedDesk extends Entity<ReservedDeskProps> {
  private constructor(props: ReservedDeskProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static fromPersistence({ deskId, id }: PersistedReservedDesk) {
    return new ReservedDesk(
      {
        deskId: new UniqueEntityID(deskId),
      },
      new UniqueEntityID(id),
    );
  }

  public static createNew(deskId: string) {
    return new ReservedDesk({
      deskId: new UniqueEntityID(deskId),
    });
  }

  public getDeskId() {
    return this.props.deskId;
  }
}
