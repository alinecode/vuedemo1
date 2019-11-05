const state = {
	
	indexCurrentMenu:{
		
		tableTest:{
			contentView : false
		},
		
	},
	
}

const getters = {
	
	indexCurrentMenu: state => state.indexCurrentMenu,
	
}

const actions = {
	
	switchMenu({
		commit
	}, menuObj) {
		commit('switchMenu', menuObj);
	},
	
}


const mutations = {
	switchMenu(state, menuObj) {
		var menuName = menuObj.menuName;
		
		for(var mName in state.indexCurrentMenu) {
			if(mName == menuName) {
				state.indexCurrentMenu[mName].contentView = true;
			} else {
				state.indexCurrentMenu[mName].contentView = false;
			}
		}
		
	}
	
}


export default {
	state,
	getters,
	actions,
	mutations
}

