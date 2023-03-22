/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from 'react';
import {
  check,
  PERMISSIONS,
  PermissionStatus,
  request,
  openSettings,
} from 'react-native-permissions';
import { AppState, Platform } from 'react-native';

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

  useEffect(() => {
    AppState.addEventListener('change', state => {
      if (state !== 'active') {
        return;
      }
      checkLocationPermission();
    });
  }, []);

  const askLocationPermission = async () => {
    let permissionStatus: PermissionStatus;

    if (Platform.OS === 'ios') {
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
    }
    if (permissionStatus === 'blocked' || permissionStatus === 'denied') {
      openSettings();
    }

    setPermissions({ ...permissions, locationStatus: permissionStatus });
  };
  const checkLocationPermission = async () => {
    let permissionStatus: PermissionStatus;

    if (Platform.OS === 'ios') {
      permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }

    setPermissions({ ...permissions, locationStatus: permissionStatus });
  };

  return (
    <PermissionContext.Provider
      value={{ permissions, askLocationPermission, checkLocationPermission }}>
      {children}
    </PermissionContext.Provider>
  );
};
