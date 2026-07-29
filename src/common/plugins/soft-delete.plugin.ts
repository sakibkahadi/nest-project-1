import { Query, Schema } from 'mongoose';

export function softDeletePlugin(schema: Schema) {
  schema.pre(/^find/, function (this: Query<any, any>) {
    this.where({ isDeleted: false });
  });
}

// now use it after create for clas
// schemname.plugin(softDeltePlugin)
