/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*****************!*\
  !*** multi app ***!
  \*****************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! /Users/heathkit/src/web/shmup/src/index.ts */1);


/***/ },
/* 1 */
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/// <reference path="../typings/browser.d.ts"/>
	/// <reference path="../public/lib/phaser.d.ts"/>
	var Phaser = __webpack_require__(/*! phaser */ 2);
	var Weapon = __webpack_require__(/*! ./weapons.ts */ 3);
	var ShmupGame = (function (_super) {
	    __extends(ShmupGame, _super);
	    function ShmupGame() {
	        _super.call(this);
	        this.background = null;
	        this.foreground = null;
	        this.player = null;
	        this.cursors = null;
	        this.speed = 300;
	        this.weapons = [];
	        this.currentWeapon = 0;
	        this.weaponName = null;
	    }
	    ShmupGame.prototype.init = function () {
	        this.game.renderer.renderSession.roundPixels = true;
	        this.physics.startSystem(Phaser.Physics.ARCADE);
	    };
	    ShmupGame.prototype.preload = function () {
	        //  We need this because the assets are on Amazon S3
	        //  Remove the next 2 lines if running locally
	        this.load.baseURL =
	            'http://files.phaser.io.s3.amazonaws.com/codingtips/issue007/';
	        this.load.crossOrigin = 'anonymous';
	        this.load.image('background', 'assets/back.png');
	        this.load.image('foreground', 'assets/fore.png');
	        this.load.image('player', 'assets/ship.png');
	        this.load.bitmapFont('shmupfont', 'assets/shmupfont.png', 'assets/shmupfont.xml');
	        for (var i = 1; i <= 11; i++) {
	            this.load.image('bullet' + i, 'assets/bullet' + i + '.png');
	        }
	        //  Note: Graphics are not for use in any commercial project
	    };
	    ShmupGame.prototype.create = function () {
	        this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
	        this.background.autoScroll(-40, 0);
	        this.weapons.push(new Weapon.SingleBullet(this.game));
	        this.weapons.push(new Weapon.FrontAndBack(this.game));
	        this.weapons.push(new Weapon.ThreeWay(this.game));
	        this.weapons.push(new Weapon.EightWay(this.game));
	        this.weapons.push(new Weapon.ScatterShot(this.game));
	        this.weapons.push(new Weapon.Beam(this.game));
	        this.weapons.push(new Weapon.SplitShot(this.game));
	        this.weapons.push(new Weapon.Pattern(this.game));
	        this.weapons.push(new Weapon.Rockets(this.game));
	        this.weapons.push(new Weapon.ScaleBullet(this.game));
	        this.weapons.push(new Weapon.Combo1(this.game));
	        this.weapons.push(new Weapon.Combo2(this.game));
	        this.currentWeapon = 0;
	        for (var i = 1; i < this.weapons.length; i++) {
	            this.weapons[i].visible = false;
	        }
	        this.player = this.add.sprite(64, 200, 'player');
	        this.physics.arcade.enable(this.player);
	        this.player.body.collideWorldBounds = true;
	        this.foreground = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'foreground');
	        this.foreground.autoScroll(-60, 0);
	        this.weaponName =
	            this.add.bitmapText(8, 364, 'shmupfont', "ENTER = Next Weapon", 24);
	        //  Cursor keys to fly + space to fire
	        this.cursors = this.input.keyboard.createCursorKeys();
	        this.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
	        var changeKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	        changeKey.onDown.add(this.nextWeapon, this);
	    };
	    ShmupGame.prototype.nextWeapon = function () {
	        //  Tidy-up the current weapon
	        if (this.currentWeapon > 9) {
	            this.weapons[this.currentWeapon].reset();
	        }
	        else {
	            this.weapons[this.currentWeapon].visible = false;
	            this.weapons[this.currentWeapon].callAll('reset', null, 0, 0);
	            this.weapons[this.currentWeapon].setAll('exists', false);
	        }
	        //  Activate the new one
	        this.currentWeapon++;
	        if (this.currentWeapon === this.weapons.length) {
	            this.currentWeapon = 0;
	        }
	        this.weapons[this.currentWeapon].visible = true;
	        this.weaponName.text = this.weapons[this.currentWeapon].name;
	    };
	    ShmupGame.prototype.update = function () {
	        this.player.body.velocity.set(0);
	        if (this.cursors.left.isDown) {
	            this.player.body.velocity.x = -this.speed;
	        }
	        else if (this.cursors.right.isDown) {
	            this.player.body.velocity.x = this.speed;
	        }
	        if (this.cursors.up.isDown) {
	            this.player.body.velocity.y = -this.speed;
	        }
	        else if (this.cursors.down.isDown) {
	            this.player.body.velocity.y = this.speed;
	        }
	        if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
	            this.weapons[this.currentWeapon].fire(this.player);
	        }
	    };
	    return ShmupGame;
	}(Phaser.State));
	var game = new Phaser.Game(640, 400, Phaser.AUTO, 'game');
	game.state.add('Game', ShmupGame, true);


/***/ },
/* 2 */
/*!*************************!*\
  !*** external "Phaser" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = Phaser;

/***/ },
/* 3 */
/*!************************!*\
  !*** ./src/weapons.ts ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	//  Our core Bullet class
	//  This is a simple Sprite object that we set a few properties on
	//  It is fired by all of the Weapon classes
	var Phaser = __webpack_require__(/*! phaser */ 2);
	var Bullet = (function (_super) {
	    __extends(Bullet, _super);
	    function Bullet(game, key) {
	        _super.call(this, game, 0, 0, key);
	        this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
	        this.anchor.set(0.5);
	        this.checkWorldBounds = true;
	        this.outOfBoundsKill = true;
	        this.exists = false;
	        this.tracking = false;
	        this.scaleSpeed = 0;
	    }
	    Bullet.prototype.fire = function (x, y, angle, speed, gx, gy) {
	        gx = gx || 0;
	        gy = gy || 0;
	        this.reset(x, y);
	        this.scale.set(1);
	        this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);
	        this.angle = angle;
	        this.body.gravity.set(gx, gy);
	    };
	    Bullet.prototype.update = function () {
	        if (this.tracking) {
	            this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
	        }
	        if (this.scaleSpeed > 0) {
	            this.scale.x += this.scaleSpeed;
	            this.scale.y += this.scaleSpeed;
	        }
	    };
	    return Bullet;
	}(Phaser.Sprite));
	var Weapon = (function (_super) {
	    __extends(Weapon, _super);
	    function Weapon(game, name) {
	        _super.call(this, game, game.world, name, false, true, Phaser.Physics.ARCADE);
	    }
	    return Weapon;
	}(Phaser.Group));
	////////////////////////////////////////////////////
	//  A single bullet is fired in front of the ship //
	////////////////////////////////////////////////////
	var SingleBullet = (function (_super) {
	    __extends(SingleBullet, _super);
	    function SingleBullet(game) {
	        _super.call(this, game, 'Single Bullet');
	        this.nextFire = 0;
	        this.bulletSpeed = 600;
	        this.fireRate = 100;
	        for (var i = 0; i < 64; i++) {
	            this.add(new Bullet(game, 'bullet5'), true);
	        }
	        return this;
	    }
	    SingleBullet.prototype.fire = function (source) {
	        if (this.game.time.time < this.nextFire) {
	            return;
	        }
	        var x = source.x + 10;
	        var y = source.y + 10;
	        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
	        this.nextFire = this.game.time.time + this.fireRate;
	    };
	    return SingleBullet;
	}(Weapon));
	exports.SingleBullet = SingleBullet;
	/////////////////////////////////////////////////////////
	//  A bullet is shot both in front and behind the ship //
	/////////////////////////////////////////////////////////
	var FrontAndBack = (function (_super) {
	    __extends(FrontAndBack, _super);
	    function FrontAndBack(game) {
	        _super.call(this, game, 'Front And Back');
	        this.nextFire = 0;
	        this.bulletSpeed = 600;
	        this.fireRate = 100;
	        for (var i = 0; i < 64; i++) {
	            this.add(new Bullet(game, 'bullet5'), true);
	        }
	        return this;
	    }
	    FrontAndBack.prototype.fire = function (source) {
	        if (this.game.time.time < this.nextFire) {
	            return;
	        }
	        var x = source.x + 10;
	        var y = source.y + 10;
	        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
	        this.getFirstExists(false).fire(x, y, 180, this.bulletSpeed, 0, 0);
	        this.nextFire = this.game.time.time + this.fireRate;
	    };
	    return FrontAndBack;
	}(Weapon));
	exports.FrontAndBack = FrontAndBack;
	//////////////////////////////////////////////////////
	//  3-way Fire (directly above, below and in front) //
	//////////////////////////////////////////////////////
	var ThreeWay = (function (_super) {
	    __extends(ThreeWay, _super);
	    function ThreeWay(game) {
	        _super.call(this, game, 'Three Way');
	        this.nextFire = 0;
	        this.bulletSpeed = 600;
	        this.fireRate = 100;
	        for (var i = 0; i < 96; i++) {
	            this.add(new Bullet(game, 'bullet7'), true);
	        }
	        return this;
	    }
	    ThreeWay.prototype.fire = function (source) {
	        if (this.game.time.time < this.nextFire) {
	            return;
	        }
	        var x = source.x + 10;
	        var y = source.y + 10;
	        this.getFirstExists(false).fire(x, y, 270, this.bulletSpeed, 0, 0);
	        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
	        this.getFirstExists(false).fire(x, y, 90, this.bulletSpeed, 0, 0);
	        this.nextFire = this.game.time.time + this.fireRate;
	    };
	    ;
	    return ThreeWay;
	}(Weapon));
	exports.ThreeWay = ThreeWay;
	;
	/////////////////////////////////////////////
	//  8-way fire, from all sides of the ship //
	/////////////////////////////////////////////
	var EightWay = (function (_super) {
	    __extends(EightWay, _super);
	    function EightWay(game) {
	        _super.call(this, game, 'Eight Way');
	        this.nextFire = 0;
	        this.bulletSpeed = 600;
	        this.fireRate = 100;
	        for (var i = 0; i < 96; i++) {
	            this.add(new Bullet(game, 'bullet5'), true);
	        }
	        return this;
	    }
	    EightWay.prototype.fire = function (source) {
	        if (this.game.time.time < this.nextFire) {
	            return;
	        }
	        var x = source.x + 16;
	        var y = source.y + 10;
	        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
	        this.getFirstExists(false).fire(x, y, 45, this.bulletSpeed, 0, 0);
	        this.getFirstExists(false).fire(x, y, 90, this.bulletSpeed, 0, 0);
	        this.getFirstExists(false).fire(x, y, 135, this.bulletSpeed, 0, 0);
	        this.getFirstExists(false).fire(x, y, 180, this.bulletSpeed, 0, 0);
	        this.getFirstExists(false).fire(x, y, 225, this.bulletSpeed, 0, 0);
	        this.getFirstExists(false).fire(x, y, 270, this.bulletSpeed, 0, 0);
	        this.getFirstExists(false).fire(x, y, 315, this.bulletSpeed, 0, 0);
	        this.nextFire = this.game.time.time + this.fireRate;
	    };
	    return EightWay;
	}(Weapon));
	exports.EightWay = EightWay;
	////////////////////////////////////////////////////
	//  Bullets are fired out scattered on the y axis //
	////////////////////////////////////////////////////
	var ScatterShot = (function (_super) {
	    __extends(ScatterShot, _super);
	    function ScatterShot(game) {
	        _super.call(this, game, 'Scatter Shot');
	        this.nextFire = 0;
	        this.bulletSpeed = 600;
	        this.fireRate = 40;
	        for (var i = 0; i < 32; i++) {
	            this.add(new Bullet(game, 'bullet5'), true);
	        }
	        return this;
	    }
	    ScatterShot.prototype.fire = function (source) {
	        if (this.game.time.time < this.nextFire) {
	            return;
	        }
	        var x = source.x + 16;
	        var y = (source.y + source.height / 2) + this.game.rnd.between(-10, 10);
	        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
	        this.nextFire = this.game.time.time + this.fireRate;
	    };
	    return ScatterShot;
	}(Weapon));
	exports.ScatterShot = ScatterShot;
	//////////////////////////////////////////////////////////////////////////
	//  Fires a streaming beam of lazers, very fast, in front of the player //
	//////////////////////////////////////////////////////////////////////////
	var Beam = (function (_super) {
	    __extends(Beam, _super);
	    function Beam(game) {
	        _super.call(this, game, 'Beam');
	        this.nextFire = 0;
	        this.bulletSpeed = 1000;
	        this.fireRate = 45;
	        for (var i = 0; i < 64; i++) {
	            this.add(new Bullet(game, 'bullet11'), true);
	        }
	        return this;
	    }
	    Beam.prototype.fire = function (source) {
	        if (this.game.time.time < this.nextFire) {
	            return;
	        }
	        var x = source.x + 40;
	        var y = source.y + 10;
	        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
	        this.nextFire = this.game.time.time + this.fireRate;
	    };
	    return Beam;
	}(Weapon));
	exports.Beam = Beam;
	///////////////////////////////////////////////////////////////////////
	//  A three-way fire where the top and bottom bullets bend on a path //
	///////////////////////////////////////////////////////////////////////
	var SplitShot = (function (_super) {
	    __extends(SplitShot, _super);
	    function SplitShot(game) {
	        _super.call(this, game, 'Split Shot');
	        this.nextFire = 0;
	        this.bulletSpeed = 700;
	        this.fireRate = 40;
	        for (var i = 0; i < 64; i++) {
	            this.add(new Bullet(game, 'bullet8'), true);
	        }
	        return this;
	    }
	    SplitShot.prototype.fire = function (source) {
	        if (this.game.time.time < this.nextFire) {
	            return;
	        }
	        var x = source.x + 20;
	        var y = source.y + 10;
	        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, -500);
	        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
	        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 500);
	        this.nextFire = this.game.time.time + this.fireRate;
	    };
	    return SplitShot;
	}(Weapon));
	exports.SplitShot = SplitShot;
	///////////////////////////////////////////////////////////////////////
	//  Bullets have Gravity.y set on a repeating pre-calculated pattern //
	///////////////////////////////////////////////////////////////////////
	var Pattern = (function (_super) {
	    __extends(Pattern, _super);
	    function Pattern(game) {
	        _super.call(this, game, 'Pattern');
	        this.nextFire = 0;
	        this.bulletSpeed = 600;
	        this.fireRate = 40;
	        this.pattern = Phaser.ArrayUtils.numberArrayStep(-800, 800, 200);
	        this.pattern =
	            this.pattern.concat(Phaser.ArrayUtils.numberArrayStep(800, -800, -200));
	        this.patternIndex = 0;
	        for (var i = 0; i < 64; i++) {
	            this.add(new Bullet(game, 'bullet4'), true);
	        }
	        return this;
	    }
	    Pattern.prototype.fire = function (source) {
	        if (this.game.time.time < this.nextFire) {
	            return;
	        }
	        var x = source.x + 20;
	        var y = source.y + 10;
	        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, this.pattern[this.patternIndex]);
	        this.patternIndex++;
	        if (this.patternIndex === this.pattern.length) {
	            this.patternIndex = 0;
	        }
	        this.nextFire = this.game.time.time + this.fireRate;
	    };
	    return Pattern;
	}(Weapon));
	exports.Pattern = Pattern;
	///////////////////////////////////////////////////////////////////
	//  Rockets that visually track the direction they're heading in //
	///////////////////////////////////////////////////////////////////
	var Rockets = (function (_super) {
	    __extends(Rockets, _super);
	    function Rockets(game) {
	        _super.call(this, game, 'Rockets');
	        this.nextFire = 0;
	        this.bulletSpeed = 400;
	        this.fireRate = 250;
	        for (var i = 0; i < 32; i++) {
	            this.add(new Bullet(game, 'bullet10'), true);
	        }
	        this.setAll('tracking', true);
	        return this;
	    }
	    Rockets.prototype.fire = function (source) {
	        if (this.game.time.time < this.nextFire) {
	            return;
	        }
	        var x = source.x + 10;
	        var y = source.y + 10;
	        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, -700);
	        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 700);
	        this.nextFire = this.game.time.time + this.fireRate;
	    };
	    return Rockets;
	}(Weapon));
	exports.Rockets = Rockets;
	////////////////////////////////////////////////////////////////////////
	//  A single bullet that scales in size as it moves across the screen //
	////////////////////////////////////////////////////////////////////////
	var ScaleBullet = (function (_super) {
	    __extends(ScaleBullet, _super);
	    function ScaleBullet(game) {
	        _super.call(this, game, 'Scale Bullet');
	        this.nextFire = 0;
	        this.bulletSpeed = 800;
	        this.fireRate = 100;
	        for (var i = 0; i < 32; i++) {
	            this.add(new Bullet(game, 'bullet9'), true);
	        }
	        this.setAll('scaleSpeed', 0.05);
	    }
	    ScaleBullet.prototype.fire = function (source) {
	        if (this.game.time.time < this.nextFire) {
	            return;
	        }
	        var x = source.x + 10;
	        var y = source.y + 10;
	        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
	        this.nextFire = this.game.time.time + this.fireRate;
	    };
	    return ScaleBullet;
	}(Weapon));
	exports.ScaleBullet = ScaleBullet;
	/////////////////////////////////////////////
	//  A Weapon Combo - Single Shot + Rockets //
	/////////////////////////////////////////////
	var Combo1 = (function () {
	    function Combo1(game) {
	        this.name = "Combo One";
	        this.weapon1 = new SingleBullet(game);
	        this.weapon2 = new Rockets(game);
	    }
	    Combo1.prototype.reset = function () {
	        this.weapon1.visible = false;
	        this.weapon1.callAll('reset', null, 0, 0);
	        this.weapon1.setAll('exists', false);
	        this.weapon2.visible = false;
	        this.weapon2.callAll('reset', null, 0, 0);
	        this.weapon2.setAll('exists', false);
	    };
	    Combo1.prototype.fire = function (source) {
	        this.weapon1.fire(source);
	        this.weapon2.fire(source);
	    };
	    return Combo1;
	}());
	exports.Combo1 = Combo1;
	/////////////////////////////////////////////////////
	//  A Weapon Combo - ThreeWay, Pattern and Rockets //
	/////////////////////////////////////////////////////
	var Combo2 = (function () {
	    function Combo2(game) {
	        this.name = "Combo Two";
	        this.weapon1 = new Pattern(game);
	        this.weapon2 = new ThreeWay(game);
	        this.weapon3 = new Rockets(game);
	    }
	    Combo2.prototype.reset = function () {
	        this.weapon1.visible = false;
	        this.weapon1.callAll('reset', null, 0, 0);
	        this.weapon1.setAll('exists', false);
	        this.weapon2.visible = false;
	        this.weapon2.callAll('reset', null, 0, 0);
	        this.weapon2.setAll('exists', false);
	        this.weapon3.visible = false;
	        this.weapon3.callAll('reset', null, 0, 0);
	        this.weapon3.setAll('exists', false);
	    };
	    Combo2.prototype.fire = function (source) {
	        this.weapon1.fire(source);
	        this.weapon2.fire(source);
	        this.weapon3.fire(source);
	    };
	    return Combo2;
	}());
	exports.Combo2 = Combo2;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map