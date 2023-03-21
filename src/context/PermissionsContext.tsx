import React, { createContext, useState } from 'react';
import {
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions';
import { Platform } from 'react-native';

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

export const PermissionContext = createContext({} as PermissionsContextProp); //  que exporta el contexto hacía afuera

// { children }:{ children: JSX.Element | []}
export const PermissionProvider = ({ children }: any) => {
  const [permissions, setPermissions] = useState(permissionInitState);

  const askLocationPermission = async () => {
    let permissionStatus: PermissionStatus;

    if (Platform.OS === 'ios') {
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
    }

    setPermissions({ ...permissions, locationStatus: permissionStatus });
  };
  const checkLocationPermission = () => {};

  return (
    <PermissionContext.Provider
      value={{ permissions, askLocationPermission, checkLocationPermission }}>
      {children}
    </PermissionContext.Provider>
  );
};
