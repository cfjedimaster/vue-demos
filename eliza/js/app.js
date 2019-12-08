const app = new Vue({
	el:'#app',
	data: {
		chat:'',
		msg:'',
		eliza:null
	},
	created() {
		this.eliza = new ElizaBot();
		this.chat = 'Eliza: '+this.eliza.getInitial();
	},
	methods: {
		speak() {
			let reply = this.eliza.transform(this.msg);
			this.chat += `<br/>You: ${this.msg}<br/>Eliza: ${reply}`;
			this.msg = '';
			this.$nextTick(() => {
				// https://stackoverflow.com/a/40737063/52160
				this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;

				if(this.eliza.quit) {
					alert('Your conversation is now over.');
					window.location.reload(true);
				}
			});

		}
	}
});