/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-06-22
 * @author Liang <liang@maichong.it>
 */

'use strict';

const nodemailer = require('nodemailer');

exports.default = class EmailSmtpDriver {
  constructor(service, options) {
    this.service = service;
    this.options = options;
    this.transporter = null;
  }

  /**
   * [async] 发送
   * @param data nodemailer e-mail message fields
   */
  send(data) {
    if (!this.transporter) {
      this.transporter = nodemailer.createTransport(this.options.smtp, this.options.defaults);
    }
    let transporter = this.transporter;
    return new Promise(function (resolve, reject) {
      transporter.sendMail(data, function (error, res) {
        if (error) {
          reject(error);
        } else {
          resolve(res);
        }
      });
    });
  }
};
