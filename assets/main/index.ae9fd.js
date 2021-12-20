window.__require=function e(t,n,i){function a(r,s){if(!n[r]){if(!t[r]){var c=r.split("/");if(c=c[c.length-1],!t[c]){var l="function"==typeof __require&&__require;if(!s&&l)return l(c,!0);if(o)return o(c,!0);throw new Error("Cannot find module '"+r+"'")}r=c}var u=n[r]={exports:{}};t[r][0].call(u.exports,function(e){return a(t[r][1][e]||e)},u,u.exports,e,t,n,i)}return n[r].exports}for(var o="function"==typeof __require&&__require,r=0;r<i.length;r++)a(i[r]);return a}({AnimationController:[function(e,t){"use strict";cc._RF.push(t,"b9742/BacNE/78yIS0cLLZI","AnimationController"),cc.Class({extends:cc.Component,properties:{timeElapsed:0,anim:null,animationNames:{default:[],type:[cc.String]},currentAnimationIndex:0},start:function(){this.anim=this.getComponent(cc.Animation),this.anim.on("finished",this.onAnimationFinished,this)},update:function(e){this.timeElapsed+=e},onAnimationFinished:function(){1==this.currentAnimationIndex?this.ChangeAnimation(2):3==this.currentAnimationIndex&&this.ChangeAnimation(0)},ChangeAnimation:function(e){if(0==e?(this.anim.play(this.animationNames[e]),this.currentAnimationIndex=e):2==e&&(this.anim.play(this.animationNames[e]),this.currentAnimationIndex=e),1==e){var t=0;3==this.currentAnimationIndex&&(t=.25-this.timeElapsed,console.log("playtime "+t)),t<0&&(t=0),this.anim.play(this.animationNames[e],t),this.currentAnimationIndex=e}else 3==e?(t=0,1==this.currentAnimationIndex&&(t=.25-this.timeElapsed,console.log("playtime "+t)),t<0&&(t=0),this.anim.play(this.animationNames[e],t),this.currentAnimationIndex=e):4==e?(this.currentAnimationIndex=e,this.anim.play(this.animationNames[e])):5==e?(this.currentAnimationIndex=e,this.anim.play(this.animationNames[e])):6==e&&(this.currentAnimationIndex=e,this.anim.play(this.animationNames[e]));this.timeElapsed=0},onDisable:function(){this.anim.off("finished",this.onAnimationFinished,this)}}),cc._RF.pop()},{}],CameraController:[function(e,t){"use strict";cc._RF.push(t,"342d88tpc1Pr7AmZB7ZCRFF","CameraController"),cc.Class({extends:cc.Component,properties:{player:{default:null,type:cc.Node},xoffset:0},start:function(){this.xoffset=this.node.x-this.player.x,this.CocosPreInitialization()},update:function(){this.FollowPlayer()},FollowPlayer:function(){this.node.x=cc.misc.lerp(this.node.x,this.player.x+this.xoffset,.75)},CocosPreInitialization:function(){cc.view.enableAutoFullScreen(!1);var e=cc.director.getPhysicsManager();e.enabled=!0,e.gravity=cc.v2(0,-1960),cc.director.getCollisionManager().enabled=!0}}),cc._RF.pop()},{}],FireObstacle:[function(e,t){"use strict";cc._RF.push(t,"0ee3czBqhxByZ5tARckC644","FireObstacle");var n=e("PlayerController");cc.Class({extends:cc.Component,properties:{delay:.5,isFireActive:!1,boxCollider:{default:null,type:cc.BoxCollider},fireAnimationController:{default:null,type:cc.Animation},canPlayAudio:!1,audioSource:{type:cc.AudioSource,default:null},animation:null},start:function(){n._instance.isFrozenPowerOn||this.FireAnimation()},FireAnimation:function(){var e=this,t=cc.tween().delay(this.delay).call(function(){e.ToggleFire()}).delay(.5).call(function(){e.ToggleFire(),e.AnimationCompleted()});this.animation=cc.tween(this.node).repeatForever(t).start()},ToggleFire:function(){Global.isGamePaused||(this.isFireActive?(this.boxCollider.enabled=!1,this.isFireActive=!1,this.audioSource.stop()):this.isFireActive||(this.boxCollider.enabled=!0,this.isFireActive=!0,this.fireAnimationController.play("fireAnimation"),this.canPlayAudio&&this.audioSource.play()))},AnimationCompleted:function(){n._instance.isFrozenPowerOn&&(this.animation.stop(),this.boxCollider.enabled=!1)}}),cc._RF.pop()},{PlayerController:"PlayerController"}],FireSound:[function(e,t){"use strict";cc._RF.push(t,"45be8F+R5lDyZjg26eKM/7F","FireSound"),cc.Class({extends:cc.Component,properties:{fireObstacle:{default:null,type:cc.Node},fireObstacleScript:null},start:function(){this.fireObstacleScript=this.fireObstacle.getComponent("FireObstacle")},onCollisionEnter:function(e){10==e.tag?(console.log("play audio"),this.fireObstacleScript.canPlayAudio=!0):9==e.tag&&(console.log("stop the audio"),this.fireObstacleScript.canPlayAudio=!1)}}),cc._RF.pop()},{}],GameManager:[function(e,t){"use strict";cc._RF.push(t,"5da0fIqjqxDSZan1MlTnkrX","GameManager");var n=e("MxPlayer"),i=cc.Class({extends:cc.Component,editor:{executionOrder:-1},properties:{config:null,defaultconfig:null,highscextra:0},statics:{_instance:null},onLoad:function(){this.CocosPreInitialization(),i._instance=this},start:function(){this.config=n._instance.OnGameInit(),n._instance.GameStart(),n._instance.MxPlayerGameStartData(),this.defaultConfig=n._instance.GameSettings(),this.highscextra=i._instance.config.highestScore,this.highscextra+=1,cc.audioEngine.stopAll()},CocosPreInitialization:function(){cc.view.enableAutoFullScreen(!1);var e=cc.director.getPhysicsManager();e.enabled=!0,e.gravity=cc.v2(0,-1960),cc.director.getCollisionManager().enabled=!0}});cc._RF.pop()},{MxPlayer:"MxPlayer"}],Global:[function(e,t){"use strict";cc._RF.push(t,"f5b35fHp3BAJYqYmU3We6T4","Global"),window.Global={isGamePlaying:!1,isGamePaused:!0,isGameOver:!1},cc._RF.pop()},{}],InputHandler:[function(e,t){"use strict";cc._RF.push(t,"faa90Dfs55Kdb1Jx0WjIMEa","InputHandler"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){cc.macro.ENABLE_MULTI_TOUCH=!1,this.node.on(cc.Node.EventType.TOUCH_START,this.TouchBegan,this),this.node.on(cc.Node.EventType.TOUCH_END,this.TouchEnded,this)},start:function(){},TouchBegan:function(e){e.getTouches()[0].getLocation(),cc.game.emit("touchBegan",{})},TouchEnded:function(e){e.getTouches()[0].getLocation(),cc.game.emit("touchEnded",{})}}),cc._RF.pop()},{}],MxPlayerEventManager:[function(e,t){"use strict";cc._RF.push(t,"eb0f49pufFIBKFipenHLm6q","MxPlayerEventManager");var n=e("ScoreManager"),i=e("encryption_1"),a=e("GameManager"),o=cc.Class({extends:cc.Component,properties:{canShowAd:!1,adtype:0,currenttime:0,adGameStartClaimed:0,adGameEndClaimed:0,adGameStartShown:0,adGameEndShown:0,adGamePowerupClaimed:0,speedIncrement:20,score:0,gamePlayTime:0,highScore:0,bgm:{default:null,type:cc.AudioSource},powerUpAutoPlayed:0,endAdAutoPlayed:0,isScoreDoubled:!1},statics:{_instance:null},onLoad:function(){o._instance=this,cc.game.on("rewardAdsExist",this.onRewardedAdsCheck,this),cc.game.on("onAdPlayed",this.adPlayed,this)},start:function(){this.schedule(function(){this.RepeatedlyCheckForRewardeVideoAds()},3,60,5)},SendPuaseEventData:function(e){if("undefined"!=typeof gameManager)try{var t={userID:String(cc.sys.localStorage.getItem("userID")),gameID:String(cc.sys.localStorage.getItem("gameID")),roomID:String(cc.sys.localStorage.getItem("roomID")),currentTime:Math.floor(e)},n=JSON.stringify(t);gameManager.onTrack("gamePause",n)}catch(i){gameManager.onError(i.stack.toString())}},MxplayerCheckForRewardeVideos:function(){if("undefined"!=typeof gameManager&&"function"==typeof gameManager.onCheckRewardedVideoAds)try{gameManager.onCheckRewardedVideoAds("rewardAdsExist")}catch(e){gameManager.onError(e.stack.toString())}},onRewardedAdsCheck:function(e){0===e.status?this.canShowAd=!0:this.canShowAd=!1},MxPlayerGameOver:function(){var e;if(null==(e=this.bgm)||e.pause(),this.CheckForHacking(),this.GetNewHighScore(),this.MxPlayerGameEndData(),"undefined"!=typeof gameManager){var t={userID:String(cc.sys.localStorage.getItem("userID")),gameID:String(cc.sys.localStorage.getItem("gameID")),roomID:String(cc.sys.localStorage.getItem("roomID")),score:this.score,highScore:this.highScore,info:i.getInfo(this.score,Math.round(this.gamePlayTime),0)};try{var n=JSON.stringify(t);gameManager.onGameOver(n)}catch(a){gameManager.onError(a.stack.toString())}}},onShowRewardedVideoAdsStart:function(){var e;if(Global.isGamePaused=!0,cc.audioEngine.stopAll(),null==(e=this.bgm)||e.pause(),this.MxPlayerGameadclicked("start"),this.adtype=0,this.adGameStartShown=1,this.MxPlayerGameadshown("start"),"undefined"!=typeof gameManager&&"function"==typeof gameManager.onShowRewardedVideoAds)try{gameManager.onShowRewardedVideoAds("onAdPlayed",null)}catch(t){gameManager.onError(t.stack.toString())}},onShowRewardedVideoAdsMid:function(){var e;if(Global.isGamePaused=!0,cc.audioEngine.stopAll(),null==(e=this.bgm)||e.pause(),this.MxPlayerGameadclicked("mid"),this.adtype=2,this.MxPlayerGameadshown("mid"),"undefined"!=typeof gameManager&&"function"==typeof gameManager.onShowRewardedVideoAds)try{gameManager.onShowRewardedVideoAds("onAdPlayed",null)}catch(t){gameManager.onError(t.stack.toString())}},onShowRewardedVideoAdsEnd:function(){var e;if(Global.isGamePaused=!0,cc.audioEngine.stopAll(),null==(e=this.bgm)||e.pause(),this.MxPlayerGameadclicked("end"),this.adtype=1,this.adGameEndShown=1,this.MxPlayerGameadshown("end"),"undefined"!=typeof gameManager&&"function"==typeof gameManager.onShowRewardedVideoAds)try{gameManager.onShowRewardedVideoAds("onAdPlayed",null)}catch(t){gameManager.onError(t.stack.toString())}},MxPlayerGameEndData:function(){if(console.log("called game end event"),"undefined"!=typeof gameManager)try{var e={userID:String(cc.sys.localStorage.getItem("userID")),gameID:String(cc.sys.localStorage.getItem("gameID")),roomID:String(cc.sys.localStorage.getItem("roomID")),currentScore:this.score,highScore:this.highScore,playTime:Math.floor(this.gamePlayTime),adGameStartOpportunity:1,adGameStartShown:this.adGameStartShown,adGameStartClaimed:this.adGameStartClaimed,adGameEndOpportunity:1,adGameEndShown:this.adGameEndShown,adGameEndClaimed:this.adGameEndClaimed,adGamePowerupClaimed:this.adGamePowerupClaimed},t=JSON.stringify(e);gameManager.onTrack("gameExit",t)}catch(n){gameManager.onError(n.stack.toString())}},MxPlayerGameadclaimed:function(e){var t=this.powerUpAutoPlayed;if("end"==e&&(t=this.endAdAutoPlayed),"undefined"!=typeof gameManager)try{var n={userID:String(cc.sys.localStorage.getItem("userID")),gameID:String(cc.sys.localStorage.getItem("gameID")),roomID:String(cc.sys.localStorage.getItem("roomID")),autoPlayed:t,position:e},i=JSON.stringify(n);gameManager.onTrack("gameAdClaimed",i)}catch(a){gameManager.onError(a.stack.toString())}},MxPlayerGameadclicked:function(e){console.log("called game end event");var t=this.powerUpAutoPlayed;if("end"==e&&(t=this.endAdAutoPlayed),"undefined"!=typeof gameManager)try{var n={userID:String(cc.sys.localStorage.getItem("userID")),gameID:String(cc.sys.localStorage.getItem("gameID")),roomID:String(cc.sys.localStorage.getItem("roomID")),autoPlayed:t,position:e},i=JSON.stringify(n);gameManager.onTrack("gameAdClicked",i)}catch(a){gameManager.onError(a.stack.toString())}},MxPlayerGameadshown:function(e){if(this.canShowAd=!1,this.MxplayerCheckForRewardeVideos(),"undefined"!=typeof gameManager)try{var t={userID:String(cc.sys.localStorage.getItem("userID")),gameID:String(cc.sys.localStorage.getItem("gameID")),roomID:String(cc.sys.localStorage.getItem("roomID")),position:e},n=JSON.stringify(t);gameManager.onTrack("gameAdShown",n)}catch(i){gameManager.onError(i.stack.toString())}},adPlayed:function(e){var t;null==(t=this.bgm)||t.play();var i,a="start";1==this.adtype?(a="end",null==(i=this.bgm)||i.pause()):2==this.adtype&&(a="mid"),this.MxPlayerGameadclaimed(a),0===e.status?0==this.adtype?(this.adGameStartClaimed=1,cc.game.emit("ShieldPowerUp",{result:1})):1==this.adtype?(this.adGameEndClaimed=1,this.score=2*n._instance.gameScore,this.isScoreDoubled=!0,this.MxPlayerGameOver()):(this.adGamePowerupClaimed+=1,cc.game.emit("ShieldPowerUp",{result:1})):1==this.adtype?(console.log(this.gamePlayTime),this.score=n._instance.gameScore,this.MxPlayerGameOver()):cc.game.emit("ShieldPowerUp",{result:0}),Global.isGamePaused=!1,cc.audioEngine.resumeAll()},update:function(e){Global.isPaused||Global.isGameOver||(this.gamePlayTime+=e)},GetNewHighScore:function(){this.highScore=a._instance.highscextra,this.highScore-=1,this.score>this.highScore&&(this.highScore=this.score),console.log("highscore "+this.highScore)},GameExit:function(){this.score=n._instance.gameScore,this.MxPlayerGameOver()},CheckForHacking:function(){n._instance.IsHacked()&&(console.log("hacked"),this.score=n._instance.GetCorrectScore(),this.isScoreDoubled&&(this.score*=2))},RepeatedlyCheckForRewardeVideoAds:function(){this.canShowAd||(console.log("checking for rewarded video ad"),this.MxplayerCheckForRewardeVideos())}});cc._RF.pop()},{GameManager:"GameManager",ScoreManager:"ScoreManager",encryption_1:"encryption_1"}],MxPlayer:[function(e,t){"use strict";cc._RF.push(t,"d3f23DyuJNJrYnODvkrR9g6","MxPlayer");var n=cc.Class({extends:cc.Component,properties:{statictesting:!0},statics:{_instance:null},onLoad:function(){n._instance=this},start:function(){},OnGameInit:function(){try{if("undefined"!=typeof gameManager){var e=gameManager.onGameInit(),t=JSON.parse(e);return t.userId,t.gameId,t.roomId,t.highestScore,t.gameMode,t.isFirstOpen,cc.sys.localStorage.setItem("userID",t.userId),cc.sys.localStorage.setItem("gameID",t.gameId),cc.sys.localStorage.setItem("roomID",t.roomId),t}}catch(n){console.log("Error Parsing Config")}},GameSettings:function(){var e={default:null,reviveScore:0,reviveEnabled:!0,reviveLives:1,reviveAdExistsDefault:!0,autoAd:!0,noDieScore:10,stickyBannersEnabled:!0,speed:300};if("undefined"==typeof gameManager)return e;try{var t=gameManager.getGameSettings();return JSON.parse(t)}catch(n){return e}},GameStart:function(){if("undefined"!=typeof gameManager)try{gameManager.onGameStart()}catch(e){gameManager.onError(e.stack.toString())}},ShowStickyAds:function(e){!0===e&&"undefined"!=typeof gameManager&&"function"==typeof gameManager.showStickyAds&&(cc.game.on("adShown",function(){console.log("showing sticky ads")}),cc.game.on("adNotShown",function(){}),gameManager.showStickyAds("bottom"))},MxPlayerGameStartData:function(){var e="first";if(null!=cc.sys.localStorage.getItem("isopen1")&&(e="new"),"undefined"!=typeof gameManager)try{var t={userID:String(cc.sys.localStorage.getItem("userID")),gameID:String(cc.sys.localStorage.getItem("gameID")),roomID:String(cc.sys.localStorage.getItem("roomID")),startType:e},n=JSON.stringify(t);gameManager.onTrack("gameStart",n)}catch(i){gameManager.onError(i.stack.toString())}}});cc._RF.pop()},{}],ObjectDestroyer:[function(e,t){"use strict";cc._RF.push(t,"4debe7woIxGEb3q7yAQm8IM","ObjectDestroyer"),cc.Class({extends:cc.Component,properties:{},start:function(){},onCollisionEnter:function(e){1==e.tag?e.node.parent.destroy():2==e.tag&&e.node.destroy()}}),cc._RF.pop()},{}],ObstacleMovement:[function(e,t){"use strict";cc._RF.push(t,"af9ebVVJBNGEYVfOa+PscM3","ObstacleMovement");var n=e("PlayerController");cc.Class({extends:cc.Component,properties:{duration:2,MovableObject:{default:null,type:cc.Node},objectType:1,animation:null,audioSource:{type:cc.AudioSource,default:null},canPlayAudio:!1},onLoad:function(){},start:function(){if(!n._instance.isFrozenPowerOn)switch(this.objectType){case 1:this.DualBlade();break;case 2:this.SideKnife();break;case 3:this.VerticalKnife();break;case 4:this.Hammer();break;case 5:this.VerticalPlate();break;case 6:this.SawBlade()}},update:function(){Global.isGamePaused&&6==this.objectType&&this.audioSource.stop()},DualBlade:function(){var e=this,t=cc.tween().by(this.duration,{angle:360}).call(function(){e.AnimationCompleted()});this.animation=cc.tween(this.MovableObject).repeatForever(t).start()},SideKnife:function(){var e=this,t=cc.tween().by(this.duration,{x:600}).by(this.duration,{x:-600}).call(function(){e.AnimationCompleted()});this.animation=cc.tween(this.MovableObject).repeatForever(t).start()},VerticalKnife:function(){var e=this,t=cc.tween().by(this.duration,{y:-480},{easing:"elasticIn"}).call(function(){e.PlayAudio()}).by(this.duration,{y:480}).call(function(){e.AnimationCompleted()});this.animation=cc.tween(this.MovableObject).repeatForever(t).start()},Hammer:function(){var e=this,t=cc.tween().by(this.duration,{angle:90},{easing:"elasticIn"}).call(function(){e.PlayAudio()}).by(this.duration,{angle:-90}).call(function(){e.AnimationCompleted()});this.animation=cc.tween(this.MovableObject).repeatForever(t).start()},VerticalPlate:function(){var e=this,t=cc.tween().delay(.2).by(this.duration,{y:-375},{easing:"elasticIn"}).call(function(){e.PlayAudio()}).delay(.2).by(this.duration,{y:375}).call(function(){e.AnimationCompleted()});this.animation=cc.tween(this.MovableObject).repeatForever(t).start()},SawBlade:function(){var e=this,t=cc.tween().by(.4,{angle:360});cc.tween(this.MovableObject).repeatForever(t).start();var n=cc.tween().by(this.duration,{y:-550}).by(this.duration,{y:550}).call(function(){e.AnimationCompleted()});this.animation=cc.tween(this.MovableObject).repeatForever(n).start()},onCollisionEnter:function(e){10==e.tag?(this.canPlayAudio=!0,6==this.objectType&&this.audioSource.play()):9==e.tag&&(console.log("stop the audio"),this.canPlayAudio=!1,6==this.objectType&&this.audioSource.stop())},PlayAudio:function(){this.canPlayAudio&&!Global.isGamePaused&&(console.log("play audio"),null!=this.audioSource&&this.audioSource.play())},AnimationCompleted:function(){n._instance.isFrozenPowerOn&&this.animation.stop()},onDestroy:function(){}}),cc._RF.pop()},{PlayerController:"PlayerController"}],ObstacleSoundManager:[function(e,t){"use strict";cc._RF.push(t,"6feb5TXF49KTIAJAMrAYK1B","ObstacleSoundManager"),cc.Class({extends:cc.Component,properties:{},start:function(){},onCollisionEnter:function(e){e.tag}}),cc._RF.pop()},{}],PlatformSpawner:[function(e,t){"use strict";var n;cc._RF.push(t,"d3474lDE9BOFZVgTr6fIxXZ","PlatformSpawner"),cc.Class({extends:cc.Component,properties:(n={obstacles:{default:[],type:cc.Prefab},widthOfObstacles:{default:[],type:cc.Float},previousObjectPosition:cc.v2(0,0),previousObject:200,previousObjectwidth:32,gap:300,minGap:200,player:{default:null,type:cc.Node}},n.previousObject={default:null,type:cc.Node},n.count=6,n.thresholdWidth=500,n),start:function(){},update:function(){Global.isGameOver||this.SpawnObstacles()},CreateObject:function(e,t){var n=cc.instantiate(this.obstacles[t]);return n.parent=this.node.parent,e.x+=this.widthOfObstacles[t]/2,n.setPosition(e),this.SyncAllChildren(n),n},SyncAllChildren:function(e){for(var t=0;t<e.children.length;t++){var n=e.children[t].getComponent(cc.RigidBody);null!=n&&n.syncPosition(),this.SyncAllChildren(e.children[t])}},SpawnObstacles:function(){if(this.CanSpawnObstacle()){var e=this.previousObject.x+this.previousObjectwidth/2+this.minGap;this.count=this.count-1;var t=0;this.count<0&&(t=1,this.count<=-3&&(this.count=3)),this.previousObject=this.CreateObject(cc.v2(e,0),t),this.previousObjectwidth=this.widthOfObstacles[t]}},CanSpawnObstacle:function(){return this.previousObject.x-this.player.x<this.thresholdWidth},GetRandom:function(e,t){return Math.random()*(t-e)+e}}),cc._RF.pop()},{}],PlayerController:[function(e,t){"use strict";cc._RF.push(t,"349d2se4ApM86nbh0n3f5rn","PlayerController");var n=e("MxPlayerEventManager"),i=e("UiController"),a=cc.Class({extends:cc.Component,editor:{executionOrder:-1},properties:{playerState:0,boxCollider:{default:null,type:cc.BoxCollider},anim:null,speedX:100,startSpeed:180,fastSpeed:720,restartSpeed:180,animationController:null,bloodAnimation:{default:null,type:cc.Animation},carrotDeathAudio:{default:null,type:cc.AudioSource},hasShield:!1,isFrozenPowerOn:!1,snowFall:{default:null,type:cc.ParticleSystem},forzenPowerUpTime:10},statics:{_instance:null},onLoad:function(){a._instance=this,cc.game.on("touchBegan",this.OnTouched,this),cc.game.on("touchEnded",this.OnTouchEnded,this)},start:function(){this.animationController=this.node.getComponent("AnimationController"),this.bloodAnimation.on("finished",this.OnBloodAnimationFinished,this),null!=this.animationController&&console.log("anima is  not null")},update:function(e){Global.isGamePaused||Global.isGameOver||0!=this.playerState&&4!=this.playerState&&(this.node.x+=this.speedX*e)},OnTouched:function(){Global.isGamePaused||Global.isGameOver||(this.animationController.ChangeAnimation(1),this.LongToShortCollider(),this.ChangePlayerState(2))},OnTouchEnded:function(){Global.isGamePaused||Global.isGameOver||(this.animationController.ChangeAnimation(3),this.ShortToLongCollider(),this.ChangePlayerState(1))},ChangePlayerState:function(e){if(4!=this.playerState||0==e)switch(this.playerState=e,e){case 0:break;case 1:this.speedX=this.startSpeed;break;case 2:this.speedX=this.fastSpeed;break;case 4:Global.isGameOver=!0,this.carrotDeathAudio.play(),this.scheduleOnce(function(){this.RestartScene()},.8),console.log("-- Game Over --")}},onCollisionEnter:function(e){this.isShieldActive?window.navigator&&window.navigator.vibrate&&window.navigator.vibrate(650):1==e.tag?this.PlayerDead():2==e.tag&&this.PlayerFireDeath()},onCollisionStay:function(){},onCollisionExit:function(){},ShortToLongCollider:function(){this.boxCollider.offset.x=76,this.boxCollider.size.width=90,this.boxCollider.offset.y=-41,this.boxCollider.size.height=318},LongToShortCollider:function(){this.boxCollider.offset.x=50,this.boxCollider.size.width=180,this.boxCollider.offset.y=-133,this.boxCollider.size.height=135},PlayerDead:function(){4!=this.playerState&&(this.bloodAnimation.play("bloodAnimation"),this.animationController.ChangeAnimation(4),this.ChangePlayerState(4))},PlayerFireDeath:function(){4!=this.playerState&&(console.log("-- fireDeath --"),this.animationController.ChangeAnimation(5),this.ChangePlayerState(4))},AnimationTesting:function(){this.anim.play("transitionBendAnimation")},OnBloodAnimationFinished:function(){this.bloodAnimation.node.getComponent(cc.Sprite).spriteFrame=null},ActivateFrozenPowerUp:function(){this.SetFrozenPowerUp(!0),cc.game.emit("powerUpActivated"),this.scheduleOnce(function(){this.SetFrozenPowerUp(!1),console.log("-- frozen powerUp is disabled --")},this.forzenPowerUpTime)},RestartScene:function(){Global.isGameOver=!0,i._instance.GameOver()},SetFrozenPowerUp:function(e){e?this.snowFall.resetSystem():this.snowFall.stopSystem(),this.isFrozenPowerOn=e},FrozenPowerUpMidAdClick:function(){4!=this.playerState&&(this.playerState=0,this.speedX=0,this.animationController.ChangeAnimation(6),n._instance.onShowRewardedVideoAdsMid())}});cc._RF.pop()},{MxPlayerEventManager:"MxPlayerEventManager",UiController:"UiController"}],ScaleAnimation:[function(e,t){"use strict";cc._RF.push(t,"19673adLy1BqKX5RbxBV0yY","ScaleAnimation"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){},start:function(){this.ScaleUpAnimation()},ScaleUpAnimation:function(){var e=cc.tween().delay(1).to(.5,{scale:1.3}).to(.5,{scale:1}).delay(1);this.animation=cc.tween(this.node).repeatForever(e).start()}}),cc._RF.pop()},{}],ScoreCalculator:[function(e,t){"use strict";cc._RF.push(t,"20579H8N8ZPvqRacLDzbDpi","ScoreCalculator");var n=e("ScoreManager");cc.Class({extends:cc.Component,properties:{},start:function(){},onCollisionEnter:function(){n._instance.UpdateScore(1),console.log("score 1 is added")}}),cc._RF.pop()},{ScoreManager:"ScoreManager"}],ScoreManager:[function(e,t){"use strict";cc._RF.push(t,"f27ffFs+yVEG7LF7HSxIS7x","ScoreManager");var n=cc.Class({extends:cc.Component,properties:{gameScore:0,scoreUI:{default:null,type:cc.Label},isLevelIncreased:!1,FraudArray:{default:[],type:cc.Integer}},statics:{_instance:null},onLoad:function(){n._instance=this},start:function(){},UpdateScore:function(e){this.gameScore+=e,this.scoreUI.string=this.gameScore,this.gameScore%5==0&&cc.game.emit("levelUp"),this.FraudArray.push(e)},IsHacked:function(){for(var e=0;e<this.FraudArray.length;e++)if(1!=this.FraudArray[e])return!0;return this.FraudArray.length!=this.gameScore},GetCorrectScore:function(){for(var e=0,t=0;t<this.FraudArray.length;t++)1==this.FraudArray[t]&&(e+=1);return console.log(e),e}});cc._RF.pop()},{}],SpawnManager:[function(e,t){"use strict";var n;cc._RF.push(t,"2515bbe0AtK9oDgzQYMgloJ","SpawnManager"),cc.Class({extends:cc.Component,properties:(n={obstacles:{default:[],type:cc.Prefab},widthOfObstacles:{default:[],type:cc.Float},previousObjectPosition:cc.v2(0,0),previousObject:200,previousObjectwidth:32,gap:300,minGap:200,player:{default:null,type:cc.Node}},n.previousObject={default:null,type:cc.Node},n.thresholdWidth=500,n.startPositionX=1e3,n.currentLevel=0,n.maxLevel=4,n),onLoad:function(){cc.game.on("levelUp",this.IncreaseLevel,this)},start:function(){if(null==this.previousObject){var e=Math.round(this.GetRandom(0,this.obstacles.length-1));this.previousObject=this.CreateObject(cc.v2(this.startPositionX,0),e),this.previousObjectwidth=this.widthOfObstacles[e]}},update:function(){Global.isGameOver||this.SpawnObstacles()},CreateObject:function(e,t){var n=cc.instantiate(this.obstacles[t]);return n.parent=this.node.parent,e.x+=this.widthOfObstacles[t]/2,n.setPosition(e),this.SyncAllChildren(n),n},SyncAllChildren:function(e){for(var t=0;t<e.children.length;t++){var n=e.children[t].getComponent(cc.RigidBody);null!=n&&n.syncPosition(),this.SyncAllChildren(e.children[t])}},SpawnObstacles:function(){if(this.CanSpawnObstacle()){var e=this.previousObject.x+this.previousObjectwidth/2+this.minGap,t=Math.round(this.GetRandom(0,this.obstacles.length-1));this.previousObject=this.CreateObject(cc.v2(e,0),t),this.previousObjectwidth=this.widthOfObstacles[t]}},CanSpawnObstacle:function(){return this.previousObject.x-this.player.x<this.thresholdWidth},GetRandom:function(e,t){return Math.random()*(t-e)+e},IncreaseLevel:function(){this.currentLevel<this.maxLevel&&(this.currentLevel+=1,this.minGap-=50,console.log("Level Increased "+this.currentLevel))}}),cc._RF.pop()},{}],Timer:[function(e,t){"use strict";cc._RF.push(t,"3f2c1KIbWRC/rqsiAKtUHdG","Timer"),cc.Class({extends:cc.Component,properties:{},start:function(){}}),cc._RF.pop()},{}],UiController:[function(e,t){"use strict";cc._RF.push(t,"30a2aaTNCFEMaz2yJlEmrlL","UiController");var n=e("MxPlayerEventManager"),i=e("ScoreManager"),a=cc.Class({extends:cc.Component,properties:{scoreLabel:{default:null,type:cc.Label},gameOverMenu:{default:null,type:cc.Node},inGameMenu:{default:null,type:cc.Node},startMenu:{default:null,type:cc.Node},shieldPowerAdMenu:{default:null,type:cc.Node},pauseMenu:{default:null,type:cc.Node},powerUpButton:{default:null,type:cc.Node},powerUpAdButton:{default:null,type:cc.Node},canCalPauseTime:!1,pausedTime:0,startTime:null,endTime:null,presentScore:{default:null,type:cc.Label},doubleScore:{default:null,type:cc.Label},instruction:{default:null,type:cc.Node},hasGameStarted:!1,shouldAutoPlay:!0,shouldAutoPlayEnd:!0,timerCount:0,powerupTimer:{default:null,type:cc.Label},doubleScoreTimer:{default:null,type:cc.Label},hasPowerUp:!1,isPowerUpUsed:!1,adOpportunityNum:0,powerUpAdPlayed:!1,powerUpAdCount:0},statics:{_instance:null},onLoad:function(){a._instance=this},start:function(){n._instance.MxplayerCheckForRewardeVideos(),cc.game.on("ShieldPowerUp",this.PowerUpAdPlayedResult,this),cc.game.on("powerUpActivated",this.IncrementPowerUpCount,this)},update:function(e){this.canCalPauseTime&&(this.pausedTime+=e)},UpdateScore:function(e){this.scoreLabel.string=e},ShouldActivate:function(e,t){switch(e){case"gameOverMenu":1==t&&(console.log("game over menu active"),this.timerCount=0,this.schedule(this.DoubleScoreAutoPlayTimer,1)),this.gameOverMenu.active=t;break;case"inGameMenu":this.inGameMenu.active=t;break;case"startMenu":this.startMenu.active=t;break;case"shieldPowerAdMenu":console.log("shield powerup activated"),1==t&&this.schedule(this.PowerUpAutoPlayTimer,1),this.shieldPowerAdMenu.active=t;break;case"pauseMenu":this.pauseMenu.active=t}},PauseGame:function(){Global.GameOver||(Global.isGamePaused=!0)},ResumeGame:function(){Global.isGamePaused=!1},PlayButton:function(){Global.isGameOver=!1,n._instance.canShowAd?(this.ShouldActivate("startMenu",!1),this.ShouldActivate("shieldPowerAdMenu",!0)):(this.ResumeGame(),this.ShouldActivate("startMenu",!1),this.ShouldActivate("inGameMenu",!0))},ShieldPowerAdClick:function(){this.shouldAutoPlay=!1,n._instance.onShowRewardedVideoAdsStart()},PowerUpMidAd:function(){n._instance.onShowRewardedVideoAdsMid()},SkipAd:function(){this.shouldAutoPlay=!1,console.log("in skip ad funciton"),this.ResumeGame(),this.ShouldActivate("shieldPowerAdMenu",!1),this.ShouldActivate("inGameMenu",!0),this.powerUpButton.active=!1,this.powerUpAdButton.active=!0},PowerUpAdPlayedResult:function(e){if(console.log("in ppowerupplayeyd function"),this.ResumeGame(),this.ShouldActivate("shieldPowerAdMenu",!1),this.ShouldActivate("inGameMenu",!0),null!=e&&1==e.result)this.powerUpAdPlayed=!0,this.adOpportunityNum+=1,this.ActivatingPowerButtons();else{if(!n._instance.canShowAd)return void this.DisablePowerButtons();console.log("adnot fullyy seen"),this.powerUpButton.active=!1,this.powerUpAdButton.active=!0}},IncrementPowerUpCount:function(){n._instance.canShowAd?this.adOpportunityNum>=3?this.DisablePowerButtons():(this.powerUpAdButton.active=!0,this.powerUpButton.active=!1):this.DisablePowerButtons()},ActivatingPowerButtons:function(){console.log("ad successully watched"),this.powerUpButton.active=!0,this.powerUpAdButton.active=!1},DisablePowerButtons:function(){console.log("in disable power buttons"),this.powerUpButton.active=!1,this.powerUpAdButton.active=!1},DoubleTheScoreAdClick:function(){0!=this.shouldAutoPlayEnd&&(console.log("in double score function"),this.shouldAutoPlayEnd=!1,n._instance.onShowRewardedVideoAdsEnd())},GameOver:function(){console.log("GameOver fucntion called"),this.ShouldActivate("inGameMenu",!1),this.ShouldActivate("pauseMenu",!1),n._instance.canShowAd&&i._instance.gameScore>0?(this.ShouldActivate("gameOverMenu",!0),this.presentScore.string=i._instance.gameScore,this.doubleScore.string=2*i._instance.gameScore):n._instance.GameExit()},RestartGame:function(){cc.director.loadScene("MainGame")},PauseButton:function(){this.canCalPauseTime=!0,this.pausedTime=0,this.startTime=new Date,this.PauseGame(),this.ShouldActivate("inGameMenu",!1),this.ShouldActivate("pauseMenu",!0)},ResumeButton:function(){this.canCalPauseTime=!1,console.log("paused time"+this.pausedTime),this.endTime=new Date;var e=this.endTime-this.startTime;e/=1e3;var t=Math.round(e);n._instance.SendPuaseEventData(t),this.ResumeGame(),this.ShouldActivate("inGameMenu",!0),this.ShouldActivate("pauseMenu",!1)},ActivateInstructionCard:function(){null==cc.sys.localStorage.getItem("isopen1")&&(this.instruction.active=!0)},PowerUpAutoPlayTimer:function(){this.timerCount>=3&&(this.shouldAutoPlay&&(console.log("adautoPlayed"),n._instance.powerUpAutoPlayed=1,this.ShieldPowerAdClick()),this.unschedule(this.PowerUpAutoPlayTimer)),this.timerCount++,this.timerCount>4&&(this.timerCount=4),this.powerupTimer.string=4-this.timerCount},DoubleScoreAutoPlayTimer:function(){console.log("in ddouble the score"),this.timerCount>=3&&(this.shouldAutoPlayEnd&&(console.log("adautoPlayed"),n._instance.endAdAutoPlayed=1,this.DoubleTheScoreAdClick()),this.unschedule(this.DoubleScoreAutoPlayTimer),console.log("unsheduling")),this.timerCount++,this.timerCount>4&&(this.timerCount=4),this.doubleScoreTimer.string=4-this.timerCount},ExitButton:function(){this.shouldAutoPlayEnd=!1,n._instance.GameExit()}});cc._RF.pop()},{MxPlayerEventManager:"MxPlayerEventManager",ScoreManager:"ScoreManager"}],encryption_1:[function(e,t){"use strict";cc._RF.push(t,"e29b1HUnhhAapB1UE7/SNXk","encryption_1");var n={jkldjs:[],hgsdg:[],outyou:function(e){return e+100},hiosdhfoe:function(e){return e+79156},dsafger:function(e){return 2*e},eryewry:function(e){return e-50},d:function(e){return 4*e},eijwuioewj:function(e){return e+3681},kryr:function(e){return e+2},rqewrqwe:function(e){return e-3},mnkdshfo:function(e){return e-46218},sedryerw:function(e){return 2*e},kuyto:function(e){return e+15},dsgwer:function(e){return e-6},j:function(e){return e-9},iuyi567:function(e){return e-100},ioeks:function(e){return e+91},qoiwhdksh:function(e){return e-7613},wqterwt:function(e){return e+1575},klilot:function(e){return e-325},ewtrey5er:function(e){return e-3481},utertyur:function(e){return e+6848},sdfyery:function(e){return e-45},ikuyiyt:function(e){return e+26},euwhsdn:function(e){return e-81},sdrfyer:function(e){return 3*e},hduy:function(e){return e+5},jghity:function(e){return e-6515},getInfo:function(e,t,n){this.dfdsfds();var i=this.fdsfdsfnb(e),a=this.lkdsjgd();this.dfdsfds();var o=this.fdsfdsfnb(t),r=this.lkdsjgd();return{number_0:1,number_1:i,number_2:o,number_3:this.fdsfdsfnb(n),number_4:a,number_5:r,number_6:this.lkdsjgd()}},yrw6yery:function(e){return e+1231},kghty:function(e){return e-45356},dsgreger:function(e){return e+35648},uertdfh:function(e){return e-3549},hjkdnfds:function(e){return e-985},beryerw:function(e){return e+8481},ijlhfew:function(e){return e+874},gdfsr3t:function(e){return e-9895},greger:function(e){return 2*e},kgigi:function(e){return e+17},khdfkjsdhfk:function(e){return e+28},dfdsfew:function(e){return e+17},dfger:function(e){return e+14},thrthfgh:function(e){return e+8},etygdg:function(e){return e+13},sdfdsgd:function(){var e=this.kgigi(0);return e=this.khdfkjsdhfk(e),e=this.dfdsfew(e),e=this.dfger(e),e=this.thrthfgh(e),this.etygdg(e)},fdsjfhw:function(e,t){var n=t-e,i=Math.random();return e+Math.round(i*n)},ehfjkeshfkds:function(e,t){return 1==t?this.hduy(e):2==t?this.ioeks(e):3==t?this.ijlhfew(e):4==t?this.eijwuioewj(e):5==t?this.hiosdhfoe(e):6==t?this.euwhsdn(e):7==t?this.hjkdnfds(e):8==t?this.qoiwhdksh(e):9==t?this.mnkdshfo(e):void 0},sdhkas:function(){this.jkldjs.push({}),this.jkldjs.push(hduy),this.jkldjs.push(ioeks),this.jkldjs.push(ijlhfew),this.jkldjs.push(eijwuioewj),this.jkldjs.push(hiosdhfoe),this.jkldjs.push(euwhsdn),this.jkldjs.push(hjkdnfds),this.jkldjs.push(qoiwhdksh),this.jkldjs.push(mnkdshfo)},dfdsfds:function(){this.hgsdg=[],this.hgsdg.push("1");for(var e=1;e<10;e++){var t=this.fdsjfhw(1,9);this.hgsdg.push(t+"")}},encryption:function(e){return e},fdsfdsfnb:function(e){for(var t=1;t<10;t++){var n=parseInt(this.hgsdg[t]);e=this.ehfjkeshfkds(e,n)}return e*this.sdfdsgd()},lkdsjgd:function(){for(var e="",t=9;t>0;t--)e+=this.hgsdg[t];return parseInt(e)}};t.exports=n,cc._RF.pop()},{}],"mx-game-emulator":[function(e,t){"use strict";cc._RF.push(t,"bf155NCSl9GYp6uU8UlGD3l","mx-game-emulator"),cc._RF.pop()},{}]},{},["AnimationController","CameraController","FireObstacle","FireSound","GameManager","Global","InputHandler","MxPlayer","MxPlayerEventManager","UiController","encryption_1","mx-game-emulator","ObjectDestroyer","ObstacleMovement","ObstacleSoundManager","PlatformSpawner","PlayerController","ScaleAnimation","ScoreCalculator","ScoreManager","SpawnManager","Timer"]);