import { SetMetadata } from '@nestjs/common';
import { RoleTypes } from 'src/db/models/User.model';

export const RolesKey: string = 'roles';

// el decorator function bt return function
// el function hya Roles bt return function esmha SetMetadata
// el decorator bya5od array gwah el roles elly 7tb2a m3aha permissions

export const Roles = (data: RoleTypes[]) => {
  return SetMetadata(RolesKey, data); // extra information on the request
};
