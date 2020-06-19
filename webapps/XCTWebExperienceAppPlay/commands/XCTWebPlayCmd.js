define(
	'DS/XCTWebExperienceAppPlay/commands/XCTWebPlayCmd',
	//define - Dependencies
	['UWA/Core', 'DS/ApplicationFrame/Command', 'DS/CAT3DExpModel/CAT3DXModel'],
	//define - CB load ---------------------------------------------------------------------------------------------------------------

	function (UWA, AFRCommand, CAT3DXModel) {
		'use strict';

		var XCTWebPlayCmd = AFRCommand.extend({

			init: function (options) {
				this._parent(options, {
					isAsynchronous: true
				});
			},

			beginExecute: function () {
			    var self = this;
				var frmWindow = this.getFrameWindow();
				var experienceBase = frmWindow._experienceBase;

				var experience = CAT3DXModel.GetExperience();
				if (experience) {
				    experienceBase.getManager('CXPWebPlayManager').play(experience).done(function () {
				        self.end();
				    });
				}
			},

			execute: function () {
			}
		});

		return XCTWebPlayCmd;
	});

