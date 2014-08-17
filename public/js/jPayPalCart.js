
// *************************************************************************
// * jPayPalCart v1.1                                                    *
// *                                                                       *
// * (c) 2012 Ultimateweb LTD <info@ultimateweb.co.uk>                     *
// * All Rights Reserved.                                                  *
// *                                                                       *
// * This program is free software: you can redistribute it and/or modify  *
// * it under the terms of the GNU General Public License as published by  *
// * the Free Software Foundation, either version 3 of the License, or     *
// * (at your option) any later version.                                   *
// *                                                                       *
// * This program is distributed in the hope that it will be useful,       *
// * but WITHOUT ANY WARRANTY; without even the implied warranty of        *
// * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         *
// * GNU General Public License for more details.                          *
// *                                                                       *
// * You should have received a copy of the GNU General Public License     *
// * along with this program.  If not, see <http://www.gnu.org/licenses/>. *
// *                                                                       *
// *************************************************************************

(function ($) {
    var methods = {
        init: function (options) {
            return this.each(function () {
                var defaults = {
                    currency: 'GBP',
                    currencysign: '',
                    business: '',
                    virtual: false,
                    quantityupdate: true,
                    notifyurl: '',
                    minicartid: '',
                    persistdays: 0
                };
                this.settings = $.extend(defaults, options, { 'cartItems': new Array() });
                if (this.settings.persistdays >= 0) loadcart(this);
                PayPalCartdisplay(this);
            });
        },
        add: function (code, description, quantity, value, tax) {
            return this.each(function () {
                var isadded = false;
                var itemcount = this.settings.cartItems.length;
                for (var i = 0; i < itemcount; i++) {
                    if (this.settings.cartItems[i]['code'] == code) {
                        this.settings.cartItems[i]['quantity'] = parseInt(this.settings.cartItems[i]['quantity']) + parseInt(quantity);
                        isadded = true;
                    }
                }
                if (!isadded) {
                    this.settings.cartItems.push({ 'code': code, 'description': description, 'quantity': quantity, 'value': value, 'tax': tax });
                }
                PayPalCartdisplay(this);
            });
        },
        remove: function (code) {
            return this.each(function () {
                var itemcount = this.settings.cartItems.length;
                var newarray = new Array();
                for (var i = 0; i < itemcount; i++) {
                    if (this.settings.cartItems[i]['code'] != code) {
                        newarray.push(this.settings.cartItems[i]);
                    }
                }
                this.settings.cartItems = newarray;
                PayPalCartdisplay(this);
            });
        },
        update: function (code, quantity) {
            return this.each(function () {
                var itemcount = this.settings.cartItems.length;
                for (var i = 0; i < itemcount; i++) {
                    if (this.settings.cartItems[i]['code'] == code) {
                        this.settings.cartItems[i]['quantity'] = parseInt(quantity);
                    }
                }
                PayPalCartdisplay(this);
            });
        }
    };

    $.fn.PayPalCart = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.tooltip');
        }
    };

    function PayPalCartdisplay(theDiv) {
        savecart(theDiv);
        var overalltotal = 0;
        var overalltax = 0;
        var totalitems = 0;
        var theform = '<form action="https://www.paypal.com/uk/cgi-bin/webscr" method="post">\r\n';
        theform += '<input type="hidden" name="cmd" value="_cart" />\r\n';
        theform += '<input type="hidden" name="upload" value="1" />\r\n';
        theform += '<input type="hidden" name="currency_code" value="' + theDiv.settings.currency + '" />\r\n';
        theform += '<input type="hidden" name="business" value="' + theDiv.settings.business + '" />\r\n';
        if (theDiv.settings.virtual) {
            theform += '<input type="hidden" name="no_shipping" value="1">\r\n';
        }
        alert(theDiv.settings.notifyURL);

        if (theDiv.settings.notifyURL != '') {
            theform += '<input type="hidden" name="notify_url" value="' + theDiv.settings.notifyURL + '" />\r\n';
        }
        theform += '<table class="PayPalCart">\r\n';
        theform += '<tr><th>&nbsp;</th><th align="left">Description</th><th align="center">Qty</th><th align="right">Price</th></tr>\r\n';
        for (var i = 0; i < theDiv.settings.cartItems.length; i++) {
            overalltotal += (theDiv.settings.cartItems[i]['quantity'] * theDiv.settings.cartItems[i]['value']);
            overalltax += (theDiv.settings.cartItems[i]['quantity'] * theDiv.settings.cartItems[i]['tax']);
            totalitems += parseInt(theDiv.settings.cartItems[i]['quantity']);
            theform += '<tr>\r\n<td><a href="javascript:void(0)" onclick="$(\'#' + theDiv.id + '\').PayPalCart(\'remove\', \'' + theDiv.settings.cartItems[i]['code'] + '\');">x</a>\r\n';
            theform += '<input type="hidden" name="item_number_' + (i + 1).toString() + '" value="' + theDiv.settings.cartItems[i]['code'] + '" />\r\n';
            theform += '<input type="hidden" name="item_name_' + (i + 1).toString() + '" value="' + theDiv.settings.cartItems[i]['description'] + '" />\r\n';
            theform += '<input type="hidden" name="quantity_' + (i + 1).toString() + '" value="' + theDiv.settings.cartItems[i]['quantity'] + '" />\r\n';
            theform += '<input type="hidden" name="amount_' + (i + 1).toString() + '" value="' + theDiv.settings.cartItems[i]['value'] + '" />\r\n';
            theform += '<input type="hidden" name="tax_' + (i + 1).toString() + '" value="' + theDiv.settings.cartItems[i]['tax'] + '" />\r\n';
            theform += '</td>\r\n';
            theform += '<td align="left">' + theDiv.settings.cartItems[i]['description'] + '</td>\r\n';
            if (theDiv.settings.quantityupdate) {
                theform += '<td align="center"><input type="text" size="2" name="' + theDiv.settings.cartItems[i]['code'] + '" value="' + theDiv.settings.cartItems[i]['quantity'] + '" onblur="$(\'#' + theDiv.id + '\').PayPalCart(\'update\',\'' + theDiv.settings.cartItems[i]['code'] + '\', $(this).val());" /></td>\r\n';
            } else {
                theform += '<td align="center">' + theDiv.settings.cartItems[i]['quantity'] + '</td>\r\n';
            }
            theform += '<td align="right">' + theDiv.settings.currencysign + parseFloat(theDiv.settings.cartItems[i]['value']).toFixed(2) + '</td></tr>\r\n';
        }
        theform += '<tr class="PayPalCartTotals"><td colspan="3" align="left">Subtotal</td><td align="right">' + theDiv.settings.currencysign + parseFloat(overalltotal).toFixed(2) + '</td></tr>\r\n';
        theform += '<tr class="PayPalCartTotals"><td colspan="3" align="left">Vat</td><td align="right">' + theDiv.settings.currencysign + parseFloat(overalltax).toFixed(2) + '</td></tr>\r\n';
        theform += '<tr class="PayPalCartTotals"><td colspan="3" align="left">Total</td><td align="right">' + theDiv.settings.currencysign + parseFloat(overalltotal + overalltax).toFixed(2) + '</td></tr>\r\n';
        theform += '<tr><td colspan="4" align="right"><input type="submit" value="Buy Now"></td></tr>\r\n';
        theform += '</table>\r\n';
        theform += '</form>\r\n';
        $(theDiv).html(theform).ready(function () {
            $(this).find('input').keypress(function (e) {
                if (e.which == 13) {
                    var thisitem = $(this).attr("name");
                    var thisval = $(this).val();
                    $(theDiv).PayPalCart('update', thisitem, thisval);
                    return false;
                }
            });
        });
        //setup the mini cart
        if (theDiv.settings.minicartid != "") {
            var minicart = '';
            minicart += totalitems.toString() + " items<br />" + theDiv.settings.currencysign + parseFloat(overalltotal).toFixed(2);
            $('#' + theDiv.settings.minicartid).html(minicart);
        }
    }

    function loadcart(theDiv) {
        var cartcount = getCookie('cart' + theDiv.id);
        if (cartcount != null && cartcount != "") {
            //a cart exists so load it up
            var actualcount = 0;
            for (i = 1; i <= cartcount; i++) {
                var thisline = getCookie('cart' + theDiv.id + i);
                if (thisline != null && thisline != "") {
                    var linearr = Array();
                    ARRline = thisline.split("##");
                    for (j = 0; j < ARRline.length; j++) {
                        var keyname = ARRline[j].substr(0, ARRline[j].indexOf("=")).replace(/^\s+|\s+$/g, "");
                        var keyval = ARRline[j].substr(ARRline[j].indexOf("=") + 1);
                        linearr[keyname] = keyval;
                    }
                    theDiv.settings.cartItems.push(linearr);
                    actualcount++;
                }
            }
        }
    }

    function savecart(theDiv) {
        //remove any existing cookies for this cart
        ARRcookies = document.cookie.split(";");
        for (i = 0; i < ARRcookies.length; i++) {
            if (ARRcookies[i].substr(0, ARRcookies[i].indexOf("=")).indexOf("cart" + theDiv.id) == 0) {
                setCookie(ARRcookies[i].substr(0, ARRcookies[i].indexOf("=")), "", 0);
            }
        }
        //Now save the cart
        if (theDiv.settings.persistdays >= 0) {
            setCookie('cart' + theDiv.id, theDiv.settings.cartItems.length, theDiv.settings.persistdays);
            for (var i = 0; i < theDiv.settings.cartItems.length; i++) {
                //save each line
                var thisline = '';
                for (var arr in theDiv.settings.cartItems[i]) {
                    if (thisline != '') thisline += '##';
                    thisline += arr + '=' + theDiv.settings.cartItems[i][arr];
                }
                setCookie("cart" + theDiv.id + (i + 1).toString(), thisline, theDiv.settings.persistdays);
            }
        }
    }

    function getCookie(c_name) {
        var i, x, y, ARRcookies = document.cookie.split(";");
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == c_name) {
                return unescape(y);
            }
        }
        return "";
    }

    function setCookie(c_name, value, exdays) {
        if (exdays > 0) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + exdays);
            var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
            document.cookie = c_name + "=" + c_value;
        } else {
            document.cookie = c_name + "=" + escape(value);
        }
    }
})(jQuery);