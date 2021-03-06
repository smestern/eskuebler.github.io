

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var sharkViewer = function (e) {
  var t = {};

  function r(n) {
    if (t[n]) return t[n].exports;
    var a = t[n] = {
      i: n,
      l: !1,
      exports: {}
    };
    return e[n].call(a.exports, a, a.exports, r), a.l = !0, a.exports;
  }

  return r.m = e, r.c = t, r.d = function (e, t, n) {
    r.o(e, t) || Object.defineProperty(e, t, {
      enumerable: !0,
      get: n
    });
  }, r.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    });
  }, r.t = function (e, t) {
    if (1 & t && (e = r(e)), 8 & t) return e;
    if (4 & t && "object" == _typeof(e) && e && e.__esModule) return e;
    var n = Object.create(null);
    if (r.r(n), Object.defineProperty(n, "default", {
      enumerable: !0,
      value: e
    }), 2 & t && "string" != typeof e) for (var a in e) {
      r.d(n, a, function (t) {
        return e[t];
      }.bind(null, a));
    }
    return n;
  }, r.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };
    return r.d(t, "a", t), t;
  }, r.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, r.p = "", r(r.s = 3);
}([function (e, t) {
  e.exports = THREE;
}, function (e, t, r) {
  "use strict";

  function n(e) {
    throw new Error(e);
  }

  e.exports = function (e) {
    e.OBJLoader = function (t) {
      this.manager = void 0 !== t ? t : e.DefaultLoadingManager, this.materials = null, this.regexp = {
        vertex_pattern: /^v\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
        normal_pattern: /^vn\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
        uv_pattern: /^vt\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
        face_vertex: /^f\s+(-?\d+)\s+(-?\d+)\s+(-?\d+)(?:\s+(-?\d+))?/,
        face_vertex_uv: /^f\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+))?/,
        face_vertex_uv_normal: /^f\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+)\/(-?\d+))?/,
        face_vertex_normal: /^f\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)(?:\s+(-?\d+)\/\/(-?\d+))?/,
        object_pattern: /^[og]\s*(.+)?/,
        smoothing_pattern: /^s\s+(\d+|on|off)/,
        material_library_pattern: /^mtllib /,
        material_use_pattern: /^usemtl /
      };
    }, e.OBJLoader.prototype = {
      constructor: e.OBJLoader,
      load: function load(t, r, a, o) {
        var s = this;
        this.onError = o || n;
        var i = new e.FileLoader(s.manager);
        i.setPath(this.path), i.load(t, function (e) {
          r(s.parse(e));
        }, a, o);
      },
      setPath: function setPath(e) {
        this.path = e;
      },
      setMaterials: function setMaterials(e) {
        this.materials = e;
      },
      _createParserState: function _createParserState() {
        var e = {
          objects: [],
          object: {},
          vertices: [],
          normals: [],
          uvs: [],
          materialLibraries: [],
          startObject: function startObject(e, t) {
            if (this.object && !1 === this.object.fromDeclaration) return this.object.name = e, void (this.object.fromDeclaration = !1 !== t);
            var r = this.object && "function" == typeof this.object.currentMaterial ? this.object.currentMaterial() : void 0;

            if (this.object && "function" == typeof this.object._finalize && this.object._finalize(!0), this.object = {
              name: e || "",
              fromDeclaration: !1 !== t,
              geometry: {
                vertices: [],
                normals: [],
                uvs: []
              },
              materials: [],
              smooth: !0,
              startMaterial: function startMaterial(e, t) {
                var r = this._finalize(!1);

                r && (r.inherited || r.groupCount <= 0) && this.materials.splice(r.index, 1);
                var n = {
                  index: this.materials.length,
                  name: e || "",
                  mtllib: Array.isArray(t) && t.length > 0 ? t[t.length - 1] : "",
                  smooth: void 0 !== r ? r.smooth : this.smooth,
                  groupStart: void 0 !== r ? r.groupEnd : 0,
                  groupEnd: -1,
                  groupCount: -1,
                  inherited: !1,
                  clone: function clone(e) {
                    var t = {
                      index: "number" == typeof e ? e : this.index,
                      name: this.name,
                      mtllib: this.mtllib,
                      smooth: this.smooth,
                      groupStart: 0,
                      groupEnd: -1,
                      groupCount: -1,
                      inherited: !1
                    };
                    return t.clone = this.clone.bind(t), t;
                  }
                };
                return this.materials.push(n), n;
              },
              currentMaterial: function currentMaterial() {
                if (this.materials.length > 0) return this.materials[this.materials.length - 1];
              },
              _finalize: function _finalize(e) {
                var t = this.currentMaterial();
                if (t && -1 === t.groupEnd && (t.groupEnd = this.geometry.vertices.length / 3, t.groupCount = t.groupEnd - t.groupStart, t.inherited = !1), e && this.materials.length > 1) for (var r = this.materials.length - 1; r >= 0; r--) {
                  this.materials[r].groupCount <= 0 && this.materials.splice(r, 1);
                }
                return e && 0 === this.materials.length && this.materials.push({
                  name: "",
                  smooth: this.smooth
                }), t;
              }
            }, r && r.name && "function" == typeof r.clone) {
              var n = r.clone(0);
              n.inherited = !0, this.object.materials.push(n);
            }

            this.objects.push(this.object);
          },
          finalize: function finalize() {
            this.object && "function" == typeof this.object._finalize && this.object._finalize(!0);
          },
          parseVertexIndex: function parseVertexIndex(e, t) {
            var r = parseInt(e, 10);
            return 3 * (r >= 0 ? r - 1 : r + t / 3);
          },
          parseNormalIndex: function parseNormalIndex(e, t) {
            var r = parseInt(e, 10);
            return 3 * (r >= 0 ? r - 1 : r + t / 3);
          },
          parseUVIndex: function parseUVIndex(e, t) {
            var r = parseInt(e, 10);
            return 2 * (r >= 0 ? r - 1 : r + t / 2);
          },
          addVertex: function addVertex(e, t, r) {
            var n = this.vertices,
                a = this.object.geometry.vertices;
            a.push(n[e + 0]), a.push(n[e + 1]), a.push(n[e + 2]), a.push(n[t + 0]), a.push(n[t + 1]), a.push(n[t + 2]), a.push(n[r + 0]), a.push(n[r + 1]), a.push(n[r + 2]);
          },
          addVertexLine: function addVertexLine(e) {
            var t = this.vertices,
                r = this.object.geometry.vertices;
            r.push(t[e + 0]), r.push(t[e + 1]), r.push(t[e + 2]);
          },
          addNormal: function addNormal(e, t, r) {
            var n = this.normals,
                a = this.object.geometry.normals;
            a.push(n[e + 0]), a.push(n[e + 1]), a.push(n[e + 2]), a.push(n[t + 0]), a.push(n[t + 1]), a.push(n[t + 2]), a.push(n[r + 0]), a.push(n[r + 1]), a.push(n[r + 2]);
          },
          addUV: function addUV(e, t, r) {
            var n = this.uvs,
                a = this.object.geometry.uvs;
            a.push(n[e + 0]), a.push(n[e + 1]), a.push(n[t + 0]), a.push(n[t + 1]), a.push(n[r + 0]), a.push(n[r + 1]);
          },
          addUVLine: function addUVLine(e) {
            var t = this.uvs,
                r = this.object.geometry.uvs;
            r.push(t[e + 0]), r.push(t[e + 1]);
          },
          addFace: function addFace(e, t, r, n, a, o, s, i, l, c, h, u) {
            var d,
                p = this.vertices.length,
                m = this.parseVertexIndex(e, p),
                v = this.parseVertexIndex(t, p),
                f = this.parseVertexIndex(r, p);

            if (void 0 === n ? this.addVertex(m, v, f) : (d = this.parseVertexIndex(n, p), this.addVertex(m, v, d), this.addVertex(v, f, d)), void 0 !== a) {
              var g = this.uvs.length;
              m = this.parseUVIndex(a, g), v = this.parseUVIndex(o, g), f = this.parseUVIndex(s, g), void 0 === n ? this.addUV(m, v, f) : (d = this.parseUVIndex(i, g), this.addUV(m, v, d), this.addUV(v, f, d));
            }

            if (void 0 !== l) {
              var b = this.normals.length;
              m = this.parseNormalIndex(l, b), v = l === c ? m : this.parseNormalIndex(c, b), f = l === h ? m : this.parseNormalIndex(h, b), void 0 === n ? this.addNormal(m, v, f) : (d = this.parseNormalIndex(u, b), this.addNormal(m, v, d), this.addNormal(v, f, d));
            }
          },
          addLineGeometry: function addLineGeometry(e, t) {
            this.object.geometry.type = "Line";

            for (var r = this.vertices.length, n = this.uvs.length, a = 0, o = e.length; a < o; a++) {
              this.addVertexLine(this.parseVertexIndex(e[a], r));
            }

            var s = 0;

            for (o = t.length; s < o; s++) {
              this.addUVLine(this.parseUVIndex(t[s], n));
            }
          }
        };
        return e.startObject("", !1), e;
      },
      parse: function parse(t, r) {
        void 0 === r && (r = !0), r && console.time("OBJLoader");

        var n = this._createParserState();

        -1 !== t.indexOf("\r\n") && (t = t.replace(/\r\n/g, "\n")), -1 !== t.indexOf("\\\n") && (t = t.replace(/\\\n/g, ""));

        for (var a = t.split("\n"), o = "", s = "", i = "", l = [], c = "function" == typeof "".trimLeft, h = 0, u = a.length; h < u; h++) {
          if (o = a[h], 0 !== (o = c ? o.trimLeft() : o.trim()).length && "#" !== (s = o.charAt(0))) if ("v" === s) " " === (i = o.charAt(1)) && null !== (l = this.regexp.vertex_pattern.exec(o)) ? n.vertices.push(parseFloat(l[1]), parseFloat(l[2]), parseFloat(l[3])) : "n" === i && null !== (l = this.regexp.normal_pattern.exec(o)) ? n.normals.push(parseFloat(l[1]), parseFloat(l[2]), parseFloat(l[3])) : "t" === i && null !== (l = this.regexp.uv_pattern.exec(o)) ? n.uvs.push(parseFloat(l[1]), parseFloat(l[2])) : this.onError("Unexpected vertex/normal/uv line: '" + o + "'");else if ("f" === s) null !== (l = this.regexp.face_vertex_uv_normal.exec(o)) ? n.addFace(l[1], l[4], l[7], l[10], l[2], l[5], l[8], l[11], l[3], l[6], l[9], l[12]) : null !== (l = this.regexp.face_vertex_uv.exec(o)) ? n.addFace(l[1], l[3], l[5], l[7], l[2], l[4], l[6], l[8]) : null !== (l = this.regexp.face_vertex_normal.exec(o)) ? n.addFace(l[1], l[3], l[5], l[7], void 0, void 0, void 0, void 0, l[2], l[4], l[6], l[8]) : null !== (l = this.regexp.face_vertex.exec(o)) ? n.addFace(l[1], l[2], l[3], l[4]) : this.onError("Unexpected face line: '" + o + "'");else if ("l" === s) {
            var d = o.substring(1).trim().split(" "),
                p = [],
                m = [];
            if (-1 === o.indexOf("/")) p = d;else for (var v = 0, f = d.length; v < f; v++) {
              var g = d[v].split("/");
              "" !== g[0] && p.push(g[0]), "" !== g[1] && m.push(g[1]);
            }
            n.addLineGeometry(p, m);
          } else if (null !== (l = this.regexp.object_pattern.exec(o))) {
            var b = (" " + l[0].substr(1).trim()).substr(1);
            n.startObject(b);
          } else if (this.regexp.material_use_pattern.test(o)) n.object.startMaterial(o.substring(7).trim(), n.materialLibraries);else if (this.regexp.material_library_pattern.test(o)) n.materialLibraries.push(o.substring(7).trim());else if (null !== (l = this.regexp.smoothing_pattern.exec(o))) {
            var y = l[1].trim().toLowerCase();
            n.object.smooth = "1" === y || "on" === y, (P = n.object.currentMaterial()) && (P.smooth = n.object.smooth);
          } else {
            if ("\0" === o) continue;
            this.onError("Unexpected line: '" + o + "'");
          }
        }

        n.finalize();
        var x = new e.Group();
        x.materialLibraries = [].concat(n.materialLibraries);

        for (h = 0, u = n.objects.length; h < u; h++) {
          var w = n.objects[h],
              C = w.geometry,
              A = w.materials,
              z = "Line" === C.type;

          if (0 !== C.vertices.length) {
            var E = new e.BufferGeometry();
            E.addAttribute("position", new e.BufferAttribute(new Float32Array(C.vertices), 3)), C.normals.length > 0 ? E.addAttribute("normal", new e.BufferAttribute(new Float32Array(C.normals), 3)) : E.computeVertexNormals(), C.uvs.length > 0 && E.addAttribute("uv", new e.BufferAttribute(new Float32Array(C.uvs), 2));

            for (var F, j = [], M = 0, O = A.length; M < O; M++) {
              var L = A[M],
                  P = void 0;

              if (null !== this.materials && (P = this.materials.create(L.name), z && P && !_instanceof(P, e.LineBasicMaterial))) {
                var D = new e.LineBasicMaterial();
                D.copy(P), P = D;
              }

              P || ((P = z ? new e.LineBasicMaterial() : new e.MeshPhongMaterial()).name = L.name), P.shading = L.smooth ? e.SmoothShading : e.FlatShading, j.push(P);
            }

            if (j.length > 1) {
              for (M = 0, O = A.length; M < O; M++) {
                L = A[M];
                E.addGroup(L.groupStart, L.groupCount, M);
              }

              var S = new e.MultiMaterial(j);
              F = z ? new e.LineSegments(E, S) : new e.Mesh(E, S);
            } else F = z ? new e.LineSegments(E, j[0]) : new e.Mesh(E, j[0]);

            F.name = w.name, x.add(F);
          }
        }

        return r && console.timeEnd("OBJLoader"), x;
      }
    };
  };
}, function (e, t) {
  e.exports = function (e) {
    function t(t, r) {
      var n, a, o, s, i;
      this.object = t, this.domElement = void 0 !== r ? r : document, this.enabled = !0, this.target = new e.Vector3(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = .25, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.keyPanSpeed = 7, this.autoRotate = !1, this.autoRotateSpeed = 2, this.enableKeys = !0, this.keys = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        BOTTOM: 40
      }, this.mouseButtons = {
        ORBIT: e.MOUSE.LEFT,
        ZOOM: e.MOUSE.MIDDLE,
        PAN: e.MOUSE.RIGHT
      }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this.getPolarAngle = function () {
        return v.phi;
      }, this.getAzimuthalAngle = function () {
        return v.theta;
      }, this.reset = function () {
        l.target.copy(l.target0), l.object.position.copy(l.position0), l.object.zoom = l.zoom0, l.object.updateProjectionMatrix(), l.dispatchEvent(c), l.update(), p = d.NONE;
      }, this.update = (n = new e.Vector3(), a = new e.Quaternion().setFromUnitVectors(t.up, new e.Vector3(0, 1, 0)), o = a.clone().inverse(), s = new e.Vector3(), i = new e.Quaternion(), function () {
        var e = l.object.position;
        return n.copy(e).sub(l.target), n.applyQuaternion(a), v.setFromVector3(n), l.autoRotate && p === d.NONE && L(2 * Math.PI / 60 / 60 * l.autoRotateSpeed), v.theta += f.theta, v.phi += f.phi, v.theta = Math.max(l.minAzimuthAngle, Math.min(l.maxAzimuthAngle, v.theta)), v.phi = Math.max(l.minPolarAngle, Math.min(l.maxPolarAngle, v.phi)), v.makeSafe(), v.radius *= g, v.radius = Math.max(l.minDistance, Math.min(l.maxDistance, v.radius)), l.target.add(b), n.setFromSpherical(v), n.applyQuaternion(o), e.copy(l.target).add(n), l.object.lookAt(l.target), !0 === l.enableDamping ? (f.theta *= 1 - l.dampingFactor, f.phi *= 1 - l.dampingFactor) : f.set(0, 0, 0), g = 1, b.set(0, 0, 0), !!(y || s.distanceToSquared(l.object.position) > m || 8 * (1 - i.dot(l.object.quaternion)) > m) && (l.dispatchEvent(c), s.copy(l.object.position), i.copy(l.object.quaternion), y = !1, !0);
      }), this.dispose = function () {
        l.domElement.removeEventListener("contextmenu", Y, !1), l.domElement.removeEventListener("mousedown", V, !1), l.domElement.removeEventListener("wheel", H, !1), l.domElement.removeEventListener("touchstart", k, !1), l.domElement.removeEventListener("touchend", N, !1), l.domElement.removeEventListener("touchmove", G, !1), document.removeEventListener("mousemove", T, !1), document.removeEventListener("mouseup", W, !1), window.removeEventListener("keydown", I, !1);
      };
      var l = this,
          c = {
        type: "change"
      },
          h = {
        type: "start"
      },
          u = {
        type: "end"
      },
          d = {
        NONE: -1,
        ROTATE: 0,
        DOLLY: 1,
        PAN: 2,
        TOUCH_ROTATE: 3,
        TOUCH_DOLLY: 4,
        TOUCH_PAN: 5
      },
          p = d.NONE,
          m = 1e-6,
          v = new e.Spherical(),
          f = new e.Spherical(),
          g = 1,
          b = new e.Vector3(),
          y = !1,
          x = new e.Vector2(),
          w = new e.Vector2(),
          C = new e.Vector2(),
          A = new e.Vector2(),
          z = new e.Vector2(),
          E = new e.Vector2(),
          F = new e.Vector2(),
          j = new e.Vector2(),
          M = new e.Vector2();

      function O() {
        return Math.pow(.95, l.zoomSpeed);
      }

      function L(e) {
        f.theta -= e;
      }

      function P(e) {
        f.phi -= e;
      }

      var D,
          S = (D = new e.Vector3(), function (e, t) {
        D.setFromMatrixColumn(t, 0), D.multiplyScalar(-e), b.add(D);
      }),
          B = function () {
        var t = new e.Vector3();
        return function (e, r) {
          t.setFromMatrixColumn(r, 1), t.multiplyScalar(e), b.add(t);
        };
      }(),
          X = function () {
        var t = new e.Vector3();
        return function (r, n) {
          var a = l.domElement === document ? l.domElement.body : l.domElement;

          if (_instanceof(l.object, e.PerspectiveCamera)) {
            var o = l.object.position;
            t.copy(o).sub(l.target);
            var s = t.length();
            s *= Math.tan(l.object.fov / 2 * Math.PI / 180), S(2 * r * s / a.clientHeight, l.object.matrix), B(2 * n * s / a.clientHeight, l.object.matrix);
          } else _instanceof(l.object, e.OrthographicCamera) ? (S(r * (l.object.right - l.object.left) / l.object.zoom / a.clientWidth, l.object.matrix), B(n * (l.object.top - l.object.bottom) / l.object.zoom / a.clientHeight, l.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), l.enablePan = !1);
        };
      }();

      function U(t) {
        _instanceof(l.object, e.PerspectiveCamera) ? g /= t : _instanceof(l.object, e.OrthographicCamera) ? (l.object.zoom = Math.max(l.minZoom, Math.min(l.maxZoom, l.object.zoom * t)), l.object.updateProjectionMatrix(), y = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), l.enableZoom = !1);
      }

      function R(t) {
        _instanceof(l.object, e.PerspectiveCamera) ? g *= t : _instanceof(l.object, e.OrthographicCamera) ? (l.object.zoom = Math.max(l.minZoom, Math.min(l.maxZoom, l.object.zoom / t)), l.object.updateProjectionMatrix(), y = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), l.enableZoom = !1);
      }

      function V(e) {
        if (!1 !== l.enabled) {
          if (e.preventDefault(), e.button === l.mouseButtons.ORBIT) {
            if (!1 === l.enableRotate) return;
            !function (e) {
              x.set(e.clientX, e.clientY);
            }(e), p = d.ROTATE;
          } else if (e.button === l.mouseButtons.ZOOM) {
            if (!1 === l.enableZoom) return;
            !function (e) {
              F.set(e.clientX, e.clientY);
            }(e), p = d.DOLLY;
          } else if (e.button === l.mouseButtons.PAN) {
            if (!1 === l.enablePan) return;
            !function (e) {
              A.set(e.clientX, e.clientY);
            }(e), p = d.PAN;
          }

          p !== d.NONE && (document.addEventListener("mousemove", T, !1), document.addEventListener("mouseup", W, !1), l.dispatchEvent(h));
        }
      }

      function T(e) {
        if (!1 !== l.enabled) if (e.preventDefault(), p === d.ROTATE) {
          if (!1 === l.enableRotate) return;
          !function (e) {
            w.set(e.clientX, e.clientY), C.subVectors(w, x);
            var t = l.domElement === document ? l.domElement.body : l.domElement;
            L(2 * Math.PI * C.x / t.clientWidth * l.rotateSpeed), P(2 * Math.PI * C.y / t.clientHeight * l.rotateSpeed), x.copy(w), l.update();
          }(e);
        } else if (p === d.DOLLY) {
          if (!1 === l.enableZoom) return;
          !function (e) {
            j.set(e.clientX, e.clientY), M.subVectors(j, F), M.y > 0 ? U(O()) : M.y < 0 && R(O()), F.copy(j), l.update();
          }(e);
        } else if (p === d.PAN) {
          if (!1 === l.enablePan) return;
          !function (e) {
            z.set(e.clientX, e.clientY), E.subVectors(z, A), X(E.x, E.y), A.copy(z), l.update();
          }(e);
        }
      }

      function W(e) {
        !1 !== l.enabled && (document.removeEventListener("mousemove", T, !1), document.removeEventListener("mouseup", W, !1), l.dispatchEvent(u), p = d.NONE);
      }

      function H(e) {
        !1 === l.enabled || !1 === l.enableZoom || p !== d.NONE && p !== d.ROTATE || (e.preventDefault(), e.stopPropagation(), function (e) {
          e.deltaY < 0 ? R(O()) : e.deltaY > 0 && U(O()), l.update();
        }(e), l.dispatchEvent(h), l.dispatchEvent(u));
      }

      function I(e) {
        !1 !== l.enabled && !1 !== l.enableKeys && !1 !== l.enablePan && function (e) {
          switch (e.keyCode) {
            case l.keys.UP:
              X(0, l.keyPanSpeed), l.update();
              break;

            case l.keys.BOTTOM:
              X(0, -l.keyPanSpeed), l.update();
              break;

            case l.keys.LEFT:
              X(l.keyPanSpeed, 0), l.update();
              break;

            case l.keys.RIGHT:
              X(-l.keyPanSpeed, 0), l.update();
          }
        }(e);
      }

      function k(e) {
        if (!1 !== l.enabled) {
          switch (e.touches.length) {
            case 1:
              if (!1 === l.enableRotate) return;
              !function (e) {
                x.set(e.touches[0].pageX, e.touches[0].pageY);
              }(e), p = d.TOUCH_ROTATE;
              break;

            case 2:
              if (!1 === l.enableZoom) return;
              !function (e) {
                var t = e.touches[0].pageX - e.touches[1].pageX,
                    r = e.touches[0].pageY - e.touches[1].pageY,
                    n = Math.sqrt(t * t + r * r);
                F.set(0, n);
              }(e), p = d.TOUCH_DOLLY;
              break;

            case 3:
              if (!1 === l.enablePan) return;
              !function (e) {
                A.set(e.touches[0].pageX, e.touches[0].pageY);
              }(e), p = d.TOUCH_PAN;
              break;

            default:
              p = d.NONE;
          }

          p !== d.NONE && l.dispatchEvent(h);
        }
      }

      function G(e) {
        if (!1 !== l.enabled) switch (e.preventDefault(), e.stopPropagation(), e.touches.length) {
          case 1:
            if (!1 === l.enableRotate) return;
            if (p !== d.TOUCH_ROTATE) return;
            !function (e) {
              w.set(e.touches[0].pageX, e.touches[0].pageY), C.subVectors(w, x);
              var t = l.domElement === document ? l.domElement.body : l.domElement;
              L(2 * Math.PI * C.x / t.clientWidth * l.rotateSpeed), P(2 * Math.PI * C.y / t.clientHeight * l.rotateSpeed), x.copy(w), l.update();
            }(e);
            break;

          case 2:
            if (!1 === l.enableZoom) return;
            if (p !== d.TOUCH_DOLLY) return;
            !function (e) {
              var t = e.touches[0].pageX - e.touches[1].pageX,
                  r = e.touches[0].pageY - e.touches[1].pageY,
                  n = Math.sqrt(t * t + r * r);
              j.set(0, n), M.subVectors(j, F), M.y > 0 ? R(O()) : M.y < 0 && U(O()), F.copy(j), l.update();
            }(e);
            break;

          case 3:
            if (!1 === l.enablePan) return;
            if (p !== d.TOUCH_PAN) return;
            !function (e) {
              z.set(e.touches[0].pageX, e.touches[0].pageY), E.subVectors(z, A), X(E.x, E.y), A.copy(z), l.update();
            }(e);
            break;

          default:
            p = d.NONE;
        }
      }

      function N(e) {
        !1 !== l.enabled && (l.dispatchEvent(u), p = d.NONE);
      }

      function Y(e) {
        e.preventDefault();
      }

      l.domElement.addEventListener("contextmenu", Y, !1), l.domElement.addEventListener("mousedown", V, !1), l.domElement.addEventListener("wheel", H, !1), l.domElement.addEventListener("touchstart", k, !1), l.domElement.addEventListener("touchend", N, !1), l.domElement.addEventListener("touchmove", G, !1), window.addEventListener("keydown", I, !1), this.update();
    }

    return t.prototype = Object.create(e.EventDispatcher.prototype), t.prototype.constructor = t, Object.defineProperties(t.prototype, {
      center: {
        get: function get() {
          return console.warn("THREE.OrbitControls: .center has been renamed to .target"), this.target;
        }
      },
      noZoom: {
        get: function get() {
          return console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."), !this.enableZoom;
        },
        set: function set(e) {
          console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."), this.enableZoom = !e;
        }
      },
      noRotate: {
        get: function get() {
          return console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."), !this.enableRotate;
        },
        set: function set(e) {
          console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."), this.enableRotate = !e;
        }
      },
      noPan: {
        get: function get() {
          return console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead."), !this.enablePan;
        },
        set: function set(e) {
          console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead."), this.enablePan = !e;
        }
      },
      noKeys: {
        get: function get() {
          return console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."), !this.enableKeys;
        },
        set: function set(e) {
          console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."), this.enableKeys = !e;
        }
      },
      staticMoving: {
        get: function get() {
          return console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."), !this.enableDamping;
        },
        set: function set(e) {
          console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."), this.enableDamping = !e;
        }
      },
      dynamicDampingFactor: {
        get: function get() {
          return console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."), this.dampingFactor;
        },
        set: function set(e) {
          console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."), this.dampingFactor = e;
        }
      }
    }), t;
  };
}, function (e, t, r) {
  "use strict";

  function n(e) {
    var t = e.split("\n"),
        r = {},
        n = "-?\\d*(?:\\.\\d+)?",
        a = new RegExp("^[ \\t]*(" + ["\\d+", "\\d+", n, n, n, n, "-1|\\d+"].join(")[ \\t]+(") + ")[ \\t]*$", "m");
    return t.forEach(function (e) {
      var t = e.match(a);

      if (t) {
        var _e = parseInt(t[1], 10);

        r[_e] = {
          id: _e,
          type: parseInt(t[2], 10),
          x: parseFloat(t[3]),
          y: parseFloat(t[4]),
          z: parseFloat(t[5]),
          radius: parseFloat(t[6]),
          parent: parseInt(t[7], 10)
        };
      }
    }), r;
  }

  r.r(t);
  var a = "data:image/png;base64,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";
  r.d(t, "default", function () {
    return p;
  }), r.d(t, "swcParser", function () {
    return n;
  });
  var o = r(0);
  r(1)(o);
  var s = r(2)(o),
      i = 50,
      l = ["uniform float particleScale;", "attribute float radius;", "attribute vec3 typeColor;", "varying vec3 vColor;", "varying vec4 mvPosition;", "varying float vRadius;", "void main() ", "{", "vColor = vec3(typeColor); // set RGB color associated to vertex; use later in fragment shader.", "mvPosition = modelViewMatrix * vec4(position, 1.0);", "// gl_PointSize = size;", "gl_PointSize = radius * ((particleScale*2.0) / length(mvPosition.z));", "gl_Position = projectionMatrix * mvPosition;", "vRadius = radius;", "}"].join("\n"),
      c = ["uniform sampler2D sphereTexture; // Imposter image of sphere", "uniform mat4 projectionMatrix;", "varying vec3 vColor; // colors associated to vertices; assigned by vertex shader", "varying vec4 mvPosition;", "varying float vRadius;", "void main() ", "{", "// what part of the sphere image?", "vec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);", "vec4 sphereColors = texture2D(sphereTexture, uv);", "// avoid further computation at invisible corners", "if (sphereColors.a < 0.3) discard;", "// calculates a color for the particle", "// gl_FragColor = vec4(vColor, 1.0);", "// sets a white particle texture to desired color", "// gl_FragColor = sqrt(gl_FragColor * texture2D(sphereTexture, uv)) + vec4(0.1, 0.1, 0.1, 0.0);", "// red channel contains colorizable sphere image", "vec3 baseColor = vColor * sphereColors.r;", "// green channel contains (white?) specular highlight", "vec3 highlightColor = baseColor + sphereColors.ggg;", "gl_FragColor = vec4(highlightColor, sphereColors.a);", "// TODO blue channel contains depth offset, but we cannot use gl_FragDepth in webgl?", "#ifdef GL_EXT_frag_depth", "float far = gl_DepthRange.far; float near = gl_DepthRange.near;", "float dz = sphereColors.b * vRadius;", "vec4 clipPos = projectionMatrix * (mvPosition + vec4(0, 0, dz, 0));", "float ndc_depth = clipPos.z/clipPos.w;", "float depth = (((far-near) * ndc_depth) + near + far) / 2.0;", "gl_FragDepthEXT = depth;", "#endif", "}"].join("\n"),
      h = (["uniform sampler2D sphereTexture; // Imposter image of sphere", "uniform mat4 projectionMatrix;", "varying vec3 vColor; // colors associated to vertices; assigned by vertex shader", "varying vec4 mvPosition;", "varying float vRadius;", "void main() ", "{", "// what part of the sphere image?", "vec2 uv = vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y);", "vec4 sphereColors = texture2D(sphereTexture, uv);", "// avoid further computation at invisible corners", "if (sphereColors.a < 0.3) discard;", "// calculates a color for the particle", "// gl_FragColor = vec4(vColor, 1.0);", "// sets a white particle texture to desired color", "// gl_FragColor = sqrt(gl_FragColor * texture2D(sphereTexture, uv)) + vec4(0.1, 0.1, 0.1, 0.0);", "// red channel contains colorizable sphere image", "vec3 baseColor = vColor * sphereColors.r;", "// green channel contains (white?) specular highlight", "gl_FragColor = vec4(baseColor, sphereColors.a);", "// TODO blue channel contains depth offset, but we cannot use gl_FragDepth in webgl?", "#ifdef GL_EXT_frag_depth", "float far = gl_DepthRange.far; float near = gl_DepthRange.near;", "float dz = sphereColors.b * vRadius;", "vec4 clipPos = projectionMatrix * (mvPosition + vec4(0, 0, dz, 0));", "float ndc_depth = clipPos.z/clipPos.w;", "float depth = (((far-near) * ndc_depth) + near + far) / 2.0;", "gl_FragDepthEXT = depth;", "#endif", "}"].join("\n"), ["attribute float radius;", "attribute vec3 typeColor;", "varying vec3 vColor;", "varying vec2 sphereUv;", "varying vec4 mvPosition;", "varying float depthScale;", "void main() ", "{", "\t// TODO - offset cone position for different sphere sizes", "\t// TODO - implement depth buffer on Chrome", "\tmvPosition = modelViewMatrix * vec4(position, 1.0);", "\t// Expand quadrilateral perpendicular to both view/screen direction and cone axis", "\tvec3 cylAxis = (modelViewMatrix * vec4(normal, 0.0)).xyz; // convert cone axis to camera space", "\tvec3 sideDir = normalize(cross(vec3(0.0,0.0,-1.0), cylAxis));", "\tmvPosition += vec4(radius * sideDir, 0.0);", "\tgl_Position = projectionMatrix * mvPosition;", "\t// Pass and interpolate color", "\tvColor = typeColor;", "\t// Texture coordinates", "\tsphereUv = uv - vec2(0.5, 0.5); // map from [0,1] range to [-.5,.5], before rotation", '\t// If sideDir is "up" on screen, make sure u is positive', "\tfloat q = sideDir.y * sphereUv.y;", "\tsphereUv.y = sign(q) * sphereUv.y;", "\t// rotate texture coordinates to match cone orientation about z", "\tfloat angle = atan(sideDir.x/sideDir.y);", "\tfloat c = cos(angle);", "\tfloat s = sin(angle);", "\tmat2 rotMat = mat2(", "\t\tc, -s, ", "\t\ts,  c);", "\tsphereUv = rotMat * sphereUv;", "\tsphereUv += vec2(0.5, 0.5); // map back from [-.5,.5] => [0,1]", "\t// We are painting an angled cone onto a flat quad, so depth correction is complicated", "   float foreshortening = length(cylAxis) / length(cylAxis.xy); // correct depth for foreshortening", "   // foreshortening limit is a tradeoff between overextruded cone artifacts, and depth artifacts", "   if (foreshortening > 4.0) foreshortening = 0.9; // hack to not pop out at extreme angles...", "   depthScale = radius * foreshortening; // correct depth for foreshortening", "}"].join("\n")),
      u = ["uniform sampler2D sphereTexture; // Imposter image of sphere", "uniform mat4 projectionMatrix;", "varying vec3 vColor;", "varying vec2 sphereUv;", "varying vec4 mvPosition;", "varying float depthScale;", "void main() ", "{", "\tvec4 sphereColors = texture2D(sphereTexture, sphereUv);", "\tif (sphereColors.a < 0.3) discard;", "\tvec3 baseColor = vColor * sphereColors.r;", "\tvec3 highlightColor = baseColor + sphereColors.ggg;", "\tgl_FragColor = vec4(highlightColor, sphereColors.a);", "#ifdef GL_EXT_frag_depth", "float dz = sphereColors.b * depthScale;", "vec4 mvp = mvPosition + vec4(0, 0, dz, 0);", "vec4 clipPos = projectionMatrix * mvp;", "float ndc_depth = clipPos.z/clipPos.w;", "float far = gl_DepthRange.far; float near = gl_DepthRange.near;", "float depth = (((far-near) * ndc_depth) + near + far) / 2.0;", "gl_FragDepthEXT = depth;", "#endif", "}"].join("\n");

  function d(e, t) {
    return e.traverse(function (e) {
      e.material = new o.ShaderMaterial({
        uniforms: {
          color: {
            type: "c",
            value: new o.Color("".concat(t))
          }
        },
        vertexShader: "\n        #line 585\n        varying vec3 normal_in_camera;\n        varying vec3 view_direction;\n\n        void main() {\n          vec4 pos_in_camera = modelViewMatrix * vec4(position, 1.0);\n          gl_Position = projectionMatrix * pos_in_camera;\n          normal_in_camera = normalize(mat3(modelViewMatrix) * normal);\n          view_direction = normalize(pos_in_camera.xyz);\n        }\n      ",
        fragmentShader: "\n        #line 597\n        uniform vec3 color;\n        varying vec3 normal_in_camera;\n        varying vec3 view_direction;\n\n        void main() {\n          // Make edges more opaque than center\n          float edginess = 1.0 - abs(dot(normal_in_camera, view_direction));\n          float opacity = clamp(edginess - 0.30, 0.0, 0.5);\n          // Darken compartment at the very edge\n          float blackness = pow(edginess, 4.0) - 0.3;\n          vec3 c = mix(color, vec3(0,0,0), blackness);\n          gl_FragColor = vec4(c, opacity);\n        }\n      ",
        transparent: !0,
        depthTest: !0,
        depthWrite: !1,
        side: o.DoubleSide
      });
    }), e;
  }

  var p =
  /*#__PURE__*/
  function () {
    function p(e) {
      _classCallCheck(this, p);

      this.swc = {}, this.mode = "particle", this.flip = !1, this.colors = [3276764, 7163891, 11156208, 15958066, 5897248, 16307260, 16591949, 13224393], this.radius_scale_factor = 1, this.metadata = !1, this.on_select_node = null, this.on_toggle_node = null, this.show_stats = !1, this.animated = !1, this.three = o, this.showAxes = !1, this.show_cones = !0, this.brainboundingbox = null, this.last_anim_timestamp = null, this.mouseHandler = null, this.nodeParticleTexture = a, this.min_radius = null, this.raycaster = new o.Raycaster(), this.trackControls = null, this.backgroundColor = 16777215, this.renderer = null, this.camera = null, this.cameraChangeCallback = null, this.onTop = !1, this.setValues(e), "object" == _typeof(e.dom_element) ? this.dom_element = e.dom_element : this.dom_element = document.getElementById(e.dom_element || "container"), this.HEIGHT = this.dom_element.clientHeight, this.WIDTH = this.dom_element.clientWidth;
    }

    _createClass(p, [{
      key: "setValues",
      value: function setValues(e) {
        var _this = this;

        void 0 !== e && Object.keys(e).forEach(function (t) {
          var r = e[t];
          void 0 !== r && t in _this && (_this[t] = r);
        });
      }
    }, {
      key: "nodeColor",
      value: function nodeColor(e) {
        return e.type < this.three_colors.length ? this.three_colors[e.type] : this.three_colors[0];
      }
    }, {
      key: "generateSphere",
      value: function generateSphere(e) {
        var t = this.three_materials[e.type],
            r = e.radius || .01,
            n = new o.SphereGeometry(r),
            a = new o.Mesh(n, t);
        return a.position.x = e.x, a.position.y = e.y, a.position.z = e.z, a;
      }
    }, {
      key: "generateConeGeometry",
      value: function generateConeGeometry(e, t) {
        var r = this.three_materials[t.type],
            n = new o.Vector3(e.x, e.y, e.z),
            a = new o.Vector3(t.x, t.y, t.z),
            s = n.distanceTo(a),
            i = new o.Vector3().subVectors(n, a);
        i.normalize();
        var l = Math.acos(i.y),
            c = new o.Vector3();
        c.crossVectors(i, new o.Vector3(0, 1, 0)), c.normalize();
        var h = e.radius || .01,
            u = t.radius || .01,
            d = new o.CylinderGeometry(h, u, s),
            p = new o.Mesh(d, r);
        p.matrixAutoUpdate = !1, p.matrix.makeRotationAxis(c, -l);
        var m = new o.Vector3((e.x + t.x) / 2, (e.y + t.y) / 2, (e.z + t.z) / 2);
        return p.matrix.setPosition(m), p;
      }
    }, {
      key: "generateCone",
      value: function generateCone(e, t, r) {
        var n = {},
            a = {};
        var s = this.nodeColor(e);
        r && (s = new o.Color(r)), n.vertex = new o.Vector3(e.x, e.y, e.z), n.radius = e.radius, n.color = s;
        var i = this.nodeColor(t);
        r && (i = new o.Color(r)), a.vertex = new o.Vector3(t.x, t.y, t.z), a.radius = t.radius, a.color = i;
        var l = new o.Vector3().subVectors(a.vertex, n.vertex),
            c = l.clone().negate();
        return {
          child: n,
          parent: a,
          normal1: l,
          normal2: c
        };
      }
    }, {
      key: "createNeuron",
      value: function createNeuron(e, t) {
        var _this2 = this;

        var r = new o.Object3D();
        var n, a;

        if ("particle" === this.mode) {
          var _s = document.createElement("img"),
              _i = new o.Texture(_s);

          _s.onload = function () {
            _i.needsUpdate = !0;
          }, _s.src = this.nodeParticleTexture, n = new o.BufferGeometry();

          var _d = .5 * this.HEIGHT / this.renderer.getPixelRatio() / Math.tan(.5 * this.fov * Math.PI / 180),
              _p = {
            radius: {
              type: "fv1",
              value: []
            },
            typeColor: {
              type: "c",
              value: []
            },
            vertices: {
              type: "f",
              value: []
            }
          },
              m = {
            particleScale: {
              type: "f",
              value: _d
            },
            sphereTexture: {
              type: "t",
              value: _i
            }
          },
              v = {};

          Object.keys(e).forEach(function (r) {
            var n = _this2.nodeColor(e[r]);

            t && (n = new o.Color(t));

            var a = function (e) {
              return new o.Vector3(e.x, e.y, e.z);
            }(e[r]);

            var s = e[r].radius * _this2.radius_scale_factor;
            _this2.min_radius && s < _this2.min_radius && (s = _this2.min_radius), _p.radius.value.push(s), _p.typeColor.value.push(n.r), _p.typeColor.value.push(n.g), _p.typeColor.value.push(n.b), _p.vertices.value.push(a.x), _p.vertices.value.push(a.y), _p.vertices.value.push(a.z), v[_p.radius.value.length - 1] = e[r].sampleNumber;
          }), n.addAttribute("position", new o.Float32BufferAttribute(_p.vertices.value, 3)), n.addAttribute("radius", new o.Float32BufferAttribute(_p.radius.value, 1)), n.addAttribute("typeColor", new o.Float32BufferAttribute(_p.typeColor.value, 3)), (a = new o.ShaderMaterial({
            uniforms: m,
            vertexShader: l,
            fragmentShader: c,
            transparent: !0
          })).extensions.fragDepth = !0;
          var f = null;
          var g = new o.Points(n, a);

          if (g.userData = {
            indexLookup: v,
            materialShader: f
          }, a.onBeforeCompile = function (e) {
            e.uniforms.alpha = {
              value: 0
            }, e.vertexShader = "uniform float alpha;\n".concat(e.vertexShader), e.vertexShader = e.vertexShader.replace("#include <begin_vertex>", ["vAlpha = alpha"].join("\n")), (f = e).uniforms.alpha.value = .9, g.userData.materialShader = f;
          }, r.add(g), this.show_cones) {
            var _n = {
              radius: {
                type: "fv1",
                value: []
              },
              indices: {
                type: "iv1",
                value: []
              },
              typeColor: {
                type: "c",
                value: []
              },
              vertices: {
                type: "f",
                value: []
              },
              normals: {
                type: "f",
                value: []
              },
              uv: {
                type: "f",
                value: []
              }
            },
                _a = {
              sphereTexture: {
                type: "t",
                value: _i
              }
            },
                _s2 = [new o.Vector2(.5, 0), new o.Vector2(.5, 1), new o.Vector2(.5, 1)],
                _l = new o.BufferGeometry();

            var _c = 0;
            Object.keys(e).forEach(function (r) {
              if (-1 !== e[r].parent) {
                var _a2 = _this2.generateCone(e[r], e[e[r].parent], t);

                var _i2 = _a2.child.color;
                t && (_i2 = new o.Color(t));

                var _l2 = _a2.parent.radius * _this2.radius_scale_factor;

                _this2.min_radius && _l2 < _this2.min_radius && (_l2 = _this2.min_radius);

                var _h = _a2.child.radius * _this2.radius_scale_factor;

                _this2.min_radius && _h < _this2.min_radius && (_h = _this2.min_radius), _n.vertices.value.push(_a2.child.vertex.x), _n.vertices.value.push(_a2.child.vertex.y), _n.vertices.value.push(_a2.child.vertex.z), _n.radius.value.push(_h), _n.typeColor.value.push(_i2.r), _n.typeColor.value.push(_i2.g), _n.typeColor.value.push(_i2.b), _n.normals.value.push(_a2.normal1.x), _n.normals.value.push(_a2.normal1.y), _n.normals.value.push(_a2.normal1.z), _n.uv.value.push(_s2[0].x), _n.uv.value.push(_s2[0].y), _n.indices.value.push(_c), _c += 1, _n.vertices.value.push(_a2.child.vertex.x), _n.vertices.value.push(_a2.child.vertex.y), _n.vertices.value.push(_a2.child.vertex.z), _n.radius.value.push(_h), _n.typeColor.value.push(_i2.r), _n.typeColor.value.push(_i2.g), _n.typeColor.value.push(_i2.b), _n.normals.value.push(_a2.normal2.x), _n.normals.value.push(_a2.normal2.y), _n.normals.value.push(_a2.normal2.z), _n.uv.value.push(_s2[1].x), _n.uv.value.push(_s2[1].y), _n.indices.value.push(_c), _c += 1, _n.vertices.value.push(_a2.parent.vertex.x), _n.vertices.value.push(_a2.parent.vertex.y), _n.vertices.value.push(_a2.parent.vertex.z), _n.radius.value.push(_l2), _n.typeColor.value.push(_i2.r), _n.typeColor.value.push(_i2.g), _n.typeColor.value.push(_i2.b), _n.normals.value.push(_a2.normal2.x), _n.normals.value.push(_a2.normal2.y), _n.normals.value.push(_a2.normal2.z), _n.uv.value.push(_s2[2].x), _n.uv.value.push(_s2[2].y), _n.indices.value.push(_c), _c += 1, _i2 = _a2.parent.color, t && (_i2 = new o.Color(t)), _n.vertices.value.push(_a2.parent.vertex.x), _n.vertices.value.push(_a2.parent.vertex.y), _n.vertices.value.push(_a2.parent.vertex.z), _n.radius.value.push(_l2), _n.typeColor.value.push(_i2.r), _n.typeColor.value.push(_i2.g), _n.typeColor.value.push(_i2.b), _n.normals.value.push(_a2.normal1.x), _n.normals.value.push(_a2.normal1.y), _n.normals.value.push(_a2.normal1.z), _n.uv.value.push(_s2[0].x), _n.uv.value.push(_s2[0].y), _n.indices.value.push(_c), _c += 1, _n.vertices.value.push(_a2.parent.vertex.x), _n.vertices.value.push(_a2.parent.vertex.y), _n.vertices.value.push(_a2.parent.vertex.z), _n.radius.value.push(_l2), _n.typeColor.value.push(_i2.r), _n.typeColor.value.push(_i2.g), _n.typeColor.value.push(_i2.b), _n.normals.value.push(_a2.normal2.x), _n.normals.value.push(_a2.normal2.y), _n.normals.value.push(_a2.normal2.z), _n.uv.value.push(_s2[1].x), _n.uv.value.push(_s2[1].y), _n.indices.value.push(_c), _c += 1, _n.vertices.value.push(_a2.child.vertex.x), _n.vertices.value.push(_a2.child.vertex.y), _n.vertices.value.push(_a2.child.vertex.z), _n.radius.value.push(_h), _n.typeColor.value.push(_i2.r), _n.typeColor.value.push(_i2.g), _n.typeColor.value.push(_i2.b), _n.normals.value.push(_a2.normal1.x), _n.normals.value.push(_a2.normal1.y), _n.normals.value.push(_a2.normal1.z), _n.uv.value.push(_s2[2].x), _n.uv.value.push(_s2[2].y), _n.indices.value.push(_c), _c += 1;
              }
            }), _l.setIndex(new o.Uint32BufferAttribute(_n.indices.value, 1)), _l.addAttribute("position", new o.Float32BufferAttribute(_n.vertices.value, 3)), _l.addAttribute("radius", new o.Float32BufferAttribute(_n.radius.value, 1)), _l.addAttribute("typeColor", new o.Float32BufferAttribute(_n.typeColor.value, 3)), _l.addAttribute("normal", new o.Float32BufferAttribute(_n.normals.value, 3)), _l.addAttribute("uv", new o.Float32BufferAttribute(_n.uv.value, 2));

            var _d2 = new o.ShaderMaterial({
              uniforms: _a,
              vertexShader: h,
              fragmentShader: u,
              transparent: !0,
              depthTest: !0,
              side: o.DoubleSide,
              alphaTest: .5
            });

            _d2.extensions.fragDepth = !0;

            var _p2 = new o.Mesh(_l, _d2);

            _d2.onBeforeCompile = function (e) {
              e.uniforms.alpha = {
                value: 0
              }, e.vertexShader = "uniform float alpha;\n".concat(e.vertexShader), e.vertexShader = e.vertexShader.replace("#include <begin_vertex>", ["vAlpha = alpha"].join("\n")), (f = e).uniforms.alpha.value = .9, _p2.userData = {
                materialShader: f
              };
            }, r.add(_p2);
          }
        } else "sphere" === this.mode && Object.keys(e).forEach(function (t) {
          var n = _this2.generateSphere(e[t]);

          if (r.add(n), _this2.show_cones && -1 !== e[t].parent) {
            var _n2 = _this2.generateConeGeometry(e[t], e[e[t].parent]);

            r.add(_n2);
          }
        });

        if ("skeleton" === this.mode || !1 === this.show_cones) {
          a = new o.LineBasicMaterial({
            color: this.colors[this.colors.length - 1]
          }), "skeleton" === this.mode && a.color.set(this.colors[0]), n = new o.Geometry(), Object.keys(e).forEach(function (t) {
            if (-1 !== e[t].parent) {
              var _r = function (e, t) {
                return {
                  child: new o.Vector3(e.x, e.y, e.z),
                  parent: new o.Vector3(t.x, t.y, t.z)
                };
              }(e[t], e[e[t].parent]);

              n.vertices.push(_r.child), n.vertices.push(_r.parent);
            }
          });

          var _t = new o.LineSegments(n, a);

          r.add(_t);
        }

        return r;
      }
    }, {
      key: "init",
      value: function init() {
        var _this3 = this;

        "noeffect" === this.effect && (this.effect = !1), this.three_colors = [], Object.keys(this.colors).forEach(function (e) {
          _this3.three_colors.push(new o.Color(_this3.colors[e]));
        }), this.three_materials = [], Object.keys(this.colors).forEach(function (e) {
          _this3.three_materials.push(new o.MeshBasicMaterial({
            color: _this3.colors[e],
            wireframe: !1
          }));
        }), this.renderer = new o.WebGLRenderer({
          antialias: !0
        }), this.renderer.setClearColor(this.backgroundColor, 1), this.renderer.setSize(this.WIDTH, this.HEIGHT), this.dom_element.appendChild(this.renderer.domElement), this.renderer.autoClear = !1, this.scene = new o.Scene(), this.fov = 45;
        this.camera = new o.PerspectiveCamera(this.fov, this.WIDTH / this.HEIGHT, 1, 1e5), this.camera.position.z = 1e5, this.showAxes && (this.axes = new o.AxisHelper(this.showAxes), this.scene.add(this.axes)), !0 === this.flip && this.camera.up.setY(-1);
        var e = this.createNeuron(this.swc);

        if (this.scene.add(e), this.sceneOnTopable = new o.Scene(), this.metadata) {
          var _e2 = function (e, t) {
            var r = document.createElement("div");
            r.id = "node_key", r.style.position = "absolute", r.style.top = "0px", r.style.right = "10px", r.style.border = "solid 1px #aaaaaa", r.style.borderRadius = "5px", r.style.padding = "2px";
            var n = "";
            return e.forEach(function (e) {
              var r = parseInt(e.type, 10),
                  a = r < t.length ? t[r] : t[0];
              var o = a;
              "string" != typeof a && (o = function (e) {
                var t = "#000000";
                return e >= 0 && e <= 15 ? t = "#00000".concat(e.toString(16)) : e >= 16 && e <= 255 ? t = "#0000".concat(e.toString(16)) : e >= 256 && e <= 4095 ? t = "#000".concat(e.toString(16)) : e >= 4096 && e <= 65535 ? t = "#00".concat(e.toString(16)) : e >= 65536 && e <= 1048575 ? t = "#0".concat(e.toString(16)) : e >= 1048576 && e <= 16777215 && (t = "#".concat(e.toString(16))), t;
              }(a)), n += "<div><span style='height:10px;width:10px;background:".concat(o, ";"), n += "display:inline-block;'></span> : ".concat(e.label, "</div>");
            }), r.innerHTML = n, r;
          }(this.metadata, this.colors);

          this.dom_element.appendChild(_e2);
        }

        this.trackControls = new s(this.camera, this.dom_element), this.trackControls.addEventListener("change", this.render.bind(this)), this.trackControls.addEventListener("change", function () {
          if (_this3.cameraChangeCallback) {
            var _e3 = _this3.camera.position;

            _this3.cameraChangeCallback({
              x: _e3.x,
              y: _e3.y,
              z: _e3.z
            });
          }
        }), this.raycaster.params.Points.threshold = i, this.dom_element.addEventListener("click", this.onClick.bind(this), !0);
      }
    }, {
      key: "cameraCoords",
      value: function cameraCoords() {
        var e = this.camera.position;
        return {
          x: e.x,
          y: e.y,
          z: e.z
        };
      }
    }, {
      key: "cameraTarget",
      value: function cameraTarget() {
        var e = this.trackControls.target;
        return {
          x: e.x,
          y: e.y,
          z: e.z
        };
      }
    }, {
      key: "resetView",
      value: function resetView() {
        this.trackControls.reset(), this.trackControls.update();
      }
    }, {
      key: "restoreView",
      value: function restoreView() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var n = arguments.length > 3 ? arguments[3] : undefined;
        this.trackControls.object.position.set(e, t, r), n && this.trackControls.target.set(n.x, n.y, n.z), this.trackControls.update();
      }
    }, {
      key: "onClick",
      value: function onClick(e) {
        var t = this.dom_element.getBoundingClientRect(),
            r = new o.Vector2();
        r.x = (e.clientX - t.left) / this.WIDTH * 2 - 1, r.y = -(e.clientY - t.top) / this.HEIGHT * 2 + 1, this.raycaster.setFromCamera(r, this.camera);
        var n = this.raycaster.intersectObjects([].concat(this.scene.children, this.sceneOnTopable.children), !0).filter(function (e) {
          return "Points" === e.object.type;
        }).filter(function (e) {
          return e.object.userData.materialShader.uniforms.alpha.value > 0;
        }).sort(function (e, t) {
          return e.distanceToRay === t.distanceToRay ? e.distance - t.distance : e.distanceToRay - t.distanceToRay;
        });

        if (n.length > 0) {
          var _t2 = n[0];

          if (e.altKey) {
            if (this.on_toggle_node) {
              var _e4 = _t2.object.userData.indexLookup[_t2.index],
                  _r2 = _t2.object.parent.name;
              this.on_toggle_node(_r2, _e4);
            }
          } else if (e.shiftKey && (this.trackControls.target = n[0].point), this.on_select_node) {
            var _r3 = _t2.object.userData.indexLookup[_t2.index],
                _a3 = _t2.object.parent.name;
            this.on_select_node(_a3, _r3, e, n[0].point);
          }
        }
      }
    }, {
      key: "animate",
      value: function animate() {
        var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        this.last_anim_timestamp ? e - this.last_anim_timestamp > 50 && (this.last_anim_timestamp = e, this.animated && this.render(), this.trackControls.update()) : (this.last_anim_timestamp = e, this.animated && this.render()), window.requestAnimationFrame(this.animate.bind(this));
      }
    }, {
      key: "render",
      value: function render() {
        this.renderer.clear(), this.renderer.render(this.scene, this.camera), this.onTop && this.renderer.clearDepth(), this.renderer.render(this.sceneOnTopable, this.camera);
      }
    }, {
      key: "loadNeuron",
      value: function loadNeuron(e, t, r) {
        var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !0;
        var a = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;

        var s = this.createNeuron(r, t),
            i = function (e, t) {
          var r = (t.xmax - t.xmin) / 2,
              n = (t.ymax - t.ymin) / 2,
              a = (t.zmax - t.zmin) / 2;
          var s = Math.min(r, n, a),
              i = new o.Vector3(t.xmin + r, t.ymin + n, t.zmin + a),
              l = s * s;
		  var values_IE_N = Object.keys(e).map( function(val) {return e[val];})
          return values_IE_N.forEach(function (e) {
            var t = new o.Vector3(e.x, e.y, e.z),
                r = new o.Vector3();
            r.subVectors(i, t);
            var n = r.dot(r);

            if (n + e.radius * e.radius > l) {
              var _a4 = Math.sqrt(n),
                  _o = (s + (_a4 + e.radius)) / 2,
                  _c2 = r.clone().divideScalar(_a4).clone().multiplyScalar(_o - e.radius);

              i = t.clone().add(_c2), l = (s = _o) * s;
            }
          }), {
            center: i,
            radius: s
          };
        }(r, function (e) {
          var t = {
            xmin: 1 / 0,
            xmax: -1 / 0,
            ymin: 1 / 0,
            ymax: -1 / 0,
            zmin: 1 / 0,
            zmax: -1 / 0
          };
		  var values_IE = Object.keys(e).map( function(val) {return e[val];})
          return values_IE.forEach(function (e) {
            var r = e.radius;
            e.x - r < t.xmin && (t.xmin = e.x - r), e.x + r > t.xmax && (t.xmax = e.x + r), e.y - r < t.ymin && (t.ymin = e.y - r), e.y + r > t.ymax && (t.ymax = e.y + r), e.z - r < t.zmin && (t.zmin = e.z - r), e.z + r > t.zmax && (t.zmax = e.z + r);
          }), t;
        }(r)),
            l = i.center,
            c = function (e, t) {
          var r = e * (Math.PI / 180) / 2,
              n = t.radius / Math.sin(r),
              a = t.center;
          return new o.Vector3(a.x, a.y, a.z + n);
        }(this.fov, i);

        n && (this.camera.position.set(c.x, c.y, c.z), this.trackControls.update(), this.trackControls.target.set(l.x, l.y, l.z)), s.name = e, (a ? this.sceneOnTopable : this.scene).add(s);
      }
    }, {
      key: "neuronLoaded",
      value: function neuronLoaded(e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
        return void 0 !== (t ? this.sceneOnTopable : this.scene).getObjectByName(e);
      }
    }, {
      key: "unloadNeuron",
      value: function unloadNeuron(e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
        var r = t ? this.sceneOnTopable : this.scene,
            n = r.getObjectByName(e);
        r.remove(n);
      }
    }, {
      key: "setNeuronVisible",
      value: function setNeuronVisible(e, t) {
        var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
        var n = (r ? this.sceneOnTopable : this.scene).getObjectByName(e);
        n && (n.visible = t);
      }
    }, {
      key: "setNeuronDisplayLevel",
      value: function setNeuronDisplayLevel(e, t) {
        if ("particle" !== this.mode) {
          var _r4 = this.scene.getObjectByName(e);

          _r4 && _r4.children.forEach(function (e) {
            e.userData.materialShader && (e.userData.materialShader.uniforms.alpha.value = t);
          });
        }
      }
    }, {
      key: "loadCompartment",
      value: function loadCompartment(e, t, r) {
        var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !0;
        var a = new o.OBJLoader().parse(r);
        (a = d(a, t)).name = e, this.scene.add(a), n && this.centerCameraAroundCompartment(a), this.trackControls.update(), this.render();
      }
    }, {
      key: "loadCompartmentFromURL",
      value: function loadCompartmentFromURL(e, t, r) {
        var _this4 = this;

        var n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !0;
        new o.OBJLoader().load(r, function (r) {
          _this4.scene.getObjectByName(e) || ((r = d(r, t)).name = e, _this4.scene.add(r), n && _this4.centerCameraAroundCompartment(r));
        });
      }
    }, {
      key: "compartmentLoaded",
      value: function compartmentLoaded(e) {
        return void 0 !== this.scene.getObjectByName(e);
      }
    }, {
      key: "centerCameraAroundCompartment",
      value: function centerCameraAroundCompartment(e) {
        var t = new o.Box3().setFromObject(e);
        this.camera.position.set(t.min.x - 10, t.min.y - 10, t.min.z - 10), this.trackControls.update();
        var r = t.getCenter();
        this.trackControls.target = r, this.render();
      }
    }, {
      key: "unloadCompartment",
      value: function unloadCompartment(e) {
        var t = this.scene.getObjectByName(e);
        this.scene.remove(t);
      }
    }, {
      key: "setCompartmentVisible",
      value: function setCompartmentVisible(e, t) {
        var r = this.scene.getObjectByName(e);
        r && (r.visible = t);
      }
    }, {
      key: "setSize",
      value: function setSize(e, t) {
        this.camera.aspect = e / t, this.camera.updateProjectionMatrix(), this.renderer.setSize(e, t), this.HEIGHT = t, this.WIDTH = e;
      }
    }, {
      key: "setBackground",
      value: function setBackground(e) {
        this.backgroundColor = e, this.renderer.setClearColor(this.backgroundColor, 1);
      }
    }]);

    return p;
  }();
}]);