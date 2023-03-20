import React, { createContext, useState } from 'react';
import { PermissionStatus } from 'react-native-permissions';

export interface PermissionState {
  locationStatus: PermissionStatus;
}
export const permissionInitState: PermissionState = {
  locationStatus: 'unavailable',
};

type PermissionsContextProp = {
  permissions: PermissionState;
  askLocationPermission: () => void;
  checkLocationPermission: () => void;
};

export const PermissionContext = createContext({} as PermissionsContextProp); // TODO   que exporta el ocntexto hacía afuera

// { children }:{ children: JSX.Element[]}
export const PermissionProvider = ({ children }: any) => {
  const [permissions, setPermissions] = useState(permissionInitState);

  const askLocationPermission = () => {};
  const checkLocationPermission = () => {};

  return (
    <PermissionContext.Provider
      value={{ permissions, askLocationPermission, checkLocationPermission }}>
      {children}
    </PermissionContext.Provider>
  );
};
