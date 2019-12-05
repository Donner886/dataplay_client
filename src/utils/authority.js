// use localStorage to store the authority info, which might be sent from server in actual project.

export function getAuthority(str) {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const department =
    sessionStorage.getItem('department') !== null ?   sessionStorage.getItem('department') : '';
  const team = sessionStorage.getItem('team') !== null ?   sessionStorage.getItem('team') : '';
  const authorityString = department + '_' + team;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority;
}


export function getSessoinInfo(){
  const department =
    sessionStorage.getItem('department') !== null ?   sessionStorage.getItem('department') : '';
  const team = sessionStorage.getItem('team') !== null ?   sessionStorage.getItem('team') : '';
  const sid = sessionStorage.getItem('sid') !== null ? sessionStorage.getItem('sid'): '';

  return {
    'department': department,
    'team':team,
    'sid':sid
  }
}


export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}
