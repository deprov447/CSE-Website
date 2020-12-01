(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Imgur = factory();
    }
}(this, function () {
    "use strict";
    var Imgur = function (options) {
        if (!this || !(this instanceof Imgur)) {
            return new Imgur(options);
        }

        if (!options) {
            options = {};
        }

        this.clientid = options.clientid;
        this.endpoint = 'https://api.imgur.com/3/image';
        this.callback = options.callback || undefined;
        this.dropzone = document.querySelectorAll('.dropzone');
        this.info = document.querySelectorAll('.info');

            this.createDragZone();
    };

    Imgur.prototype = {

        createEls: function (name, props, text) {
            var el = document.createElement(name), p;
            for (p in props) {
                if (props.hasOwnProperty(p)) {
                    el[p] = props[p];
                }
            }
            if (text) {
                el.appendChild(document.createTextNode(text));
            }
            return el;
        },
        insertAfter: function (referenceNode, newNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        },
        post: function (path, data, callback) {
            var xhttp = new XMLHttpRequest();

            xhttp.open('POST', path, true);
            xhttp.setRequestHeader('Authorization', 'Client-ID ' + this.clientid);
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status >= 200 && this.status < 300) {
                        var response = '';
                        try {
                            response = JSON.parse(this.responseText);
                        } catch (err) {
                            response = this.responseText;
                        }
                        callback.call(window, response);
                    } else {
                        throw new Error(this.status + " - " + this.statusText);
                    }
                }
            };
            xhttp.send(data);
            xhttp = null;
        },
        createDragZone: function () {
            Array.prototype.forEach.call(this.dropzone, function (zone) {
                this.upload(zone);
            }.bind(this));
        },
        matchFiles: function (file, zone) {
            var status = zone.nextSibling;
            var submitButton = document.querySelector("#submit")

            if (file.type.match(/image/) && file.type !== 'image/svg+xml') {
                console.log("if wala (104)")
                submitButton.innerHTML="Please Wait"
                submitButton.disabled=true;

                var fd = new FormData();
                fd.append('image', file);

                this.post(this.endpoint, fd, function (data) {
                    document.body.classList.remove('loading');
                    console.log("done uploading")
                    submitButton.innerHTML="Proceed"
                    submitButton.disabled=false;
                    typeof this.callback === 'function' && this.callback.call(this, data);
                }.bind(this));
            } else {
                console.log("else(114)")
                get_link = prompt("Kindly upload your pic to imgur.com and paste the link here", "");
            }
        },
        upload: function (zone) {
            var file, target, i, len;

            zone.addEventListener('change', function (e) {
                if (e.target && e.target.nodeName === 'INPUT' && e.target.type === 'file') {
                    target = e.target.files;

                    for (i = 0, len = target.length; i < len; i += 1) {
                        file = target[i];
                        this.matchFiles(file, zone);
                    }
                }
            }.bind(this), false);
        }
    };

    return Imgur;
}));

var get_link="";

var feedback = function(res) {
    if (res.success === true) {
        get_link = res.data.link.replace(/^http:\/\//i, 'https://');
        document.querySelector("#image").value=get_link
    }
};

new Imgur({
    clientid: '1fcf43851fd0d7c',
    callback: feedback
});
