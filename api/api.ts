// Lokasi file: app/api.ts

let mockDatabase = {
  lampStatus: 'off' as 'on' | 'off',
  personStatus: 'not-detected' as 'detected' | 'not-detected',
  isAutoMode: false,
};


export const fetchDeviceStatus = (): Promise<typeof mockDatabase> => {
  console.log('[API] Fetching status...');
  return new Promise(resolve => {

    setTimeout(() => {

      mockDatabase.personStatus = Math.random() > 0.6 ? 'detected' : 'not-detected';
      console.log('[API] Status received:', mockDatabase);
      resolve(mockDatabase);
    }, 500);
  });
};


export const updateLampState = (newState: { lampStatus?: 'on' | 'off'; isAutoMode?: boolean }): Promise<{ success: boolean }> => {
  console.log('[API] Sending update:', newState);
  return new Promise(resolve => {
    setTimeout(() => {
      mockDatabase = { ...mockDatabase, ...newState };
      console.log('[API] Update success. New state:', mockDatabase);
      resolve({ success: true });
    }, 300);
  });
};