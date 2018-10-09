export const environment = {
  production: true,
  apiUrl: 'https://algamoney-api.herokuapp.com',
  fotoAlunoDefault: 'https://s3-sa-east-1.amazonaws.com/gescolar/232f56b8-0a40-41a4-a712-2733fa80fcf8_.jpg',
  fotoProfessor: 'https://s3-sa-east-1.amazonaws.com/gescolar/c55f57dd-ee54-41f1-9024-2128d1913b39_.jpg',
  tokenWhitelistedDomains: [new RegExp('algamoney-api.herokuapp.com') ],
  tokenBlacklistedRoutes: [new RegExp('\/oauth\/token')]
};
