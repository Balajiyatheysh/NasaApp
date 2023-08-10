export type ScreenParamList = {
  Home: undefined;
  Details: { AsteroidId: string | number | null | undefined }
}

export type DetailsScreenRouteProp = {
  id: string | number | undefined;
  name: string | undefined;
  nasa_jpl_url: string | undefined;
  is_potentially_hazardous_asteroid: boolean | string | undefined;
}