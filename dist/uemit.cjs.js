"use strict";module.exports=class{constructor(){this.events={}}async request(t,e){const s={event:t.toString(),timestamp:(new Date).getTime(),data:e,respond:function(t){this.data=t}};try{return await this.events[t](s),s.data}catch(n){throw n}}subscribe(t,e){return this.events[t]=e,this}};
