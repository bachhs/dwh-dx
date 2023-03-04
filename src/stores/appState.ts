import { defineStore } from "pinia"; 
export const useAppStateStore = defineStore("appState", {
	state: () => {
		return {
			userInfo: {} as any,
		};
	},
	actions: {
		setUserInfo(_userInfo:any){
			this.userInfo = _userInfo;
		},
		setUserProfileUrl(_profileUrl:string){
			this.userInfo.profileUrl = _profileUrl;
		},
		getUserInfo(){
			return this.userInfo;
		},
	},
});
