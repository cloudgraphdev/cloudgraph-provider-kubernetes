# 1.0.0-alpha.1 (2022-04-05)


### Bug Fixes

* **config:** update config log out to use context.name ([d12bcd5](https://github.com/cloudgraphdev/cloudgraph-provider-kubernetes/commit/d12bcd5be92a1c263421c4658cd95c4ecc6983fb))
* **service:** fix node schema ([1e2db65](https://github.com/cloudgraphdev/cloudgraph-provider-kubernetes/commit/1e2db65cbd1acdb3f5054b9831eb1af8b31a5a8c))
* **services:** fix services schema ([53f1fca](https://github.com/cloudgraphdev/cloudgraph-provider-kubernetes/commit/53f1fca8edf338a5880041224be4a2bb4a31dbb2))
* **services:** small fixes for cronJob and pod schemas ([932fad2](https://github.com/cloudgraphdev/cloudgraph-provider-kubernetes/commit/932fad23e4cc82561f2ed055ee7e5d21ed9f6fcf))
* **services:** update deployment format for safe accessors ([dc3e6a4](https://github.com/cloudgraphdev/cloudgraph-provider-kubernetes/commit/dc3e6a4f8af482199cabbddc0709e6861e5fdda7))
* **services:** update pod schema to fix id issue ([af5a62d](https://github.com/cloudgraphdev/cloudgraph-provider-kubernetes/commit/af5a62d1245b4eaf69912f2ef0c891159d20dd7a))
* **services:** update service connection names to plural ([5a4030d](https://github.com/cloudgraphdev/cloudgraph-provider-kubernetes/commit/5a4030df7c31c910e56a54b8d6a336eba2ea2a67))
* **services:** update service format func for safe access ([309a89b](https://github.com/cloudgraphdev/cloudgraph-provider-kubernetes/commit/309a89b74f405e5cfd4a3afbcc5ece979ef5d159))
* **services:** update Service schema, move format func ([46ae6c6](https://github.com/cloudgraphdev/cloudgraph-provider-kubernetes/commit/46ae6c62c629eb1178c0e6710b1e754d2bdb1b50))
* **service:** update deployment class name ([e0f8e83](https://github.com/cloudgraphdev/cloudgraph-provider-kubernetes/commit/e0f8e83fdb1779114c180f46d035fb20e0af670c))
* **service:** update deployment mutation name ([9d734b2](https://github.com/cloudgraphdev/cloudgraph-provider-kubernetes/commit/9d734b24c4f7791d8b39dbee000da8d7ee4f323b))
* **service:** update service schemas with directives. remove context hardocde ([c6fabbb](https://github.com/cloudgraphdev/cloudgraph-provider-kubernetes/commit/c6fabbb5cbdfabdaa684dbdd912a4090c8972a6c))


### Features

* **config:** beginning of k8s provider with auth, config, node serivce, and namespace service ([9201ec5](https://github.com/cloudgraphdev/cloudgraph-provider-kubernetes/commit/9201ec55fc3c03fc20e99620e45d9093ee5a2806))
* **services:** add cronJob service ([39cc35a](https://github.com/cloudgraphdev/cloudgraph-provider-kubernetes/commit/39cc35a160520a695a4a40db52952e05d09b73cb))
* **services:** add job service ([5e77852](https://github.com/cloudgraphdev/cloudgraph-provider-kubernetes/commit/5e778526c14764b4d4ce18e167b3425a737aef3d))
* **services:** add networkPolicy service ([8c6c9d5](https://github.com/cloudgraphdev/cloudgraph-provider-kubernetes/commit/8c6c9d5a55d1041e57fea291c0f9412c3bfb4d13))
* **services:** add pod service and refactor obj -> array with util ([6e06b48](https://github.com/cloudgraphdev/cloudgraph-provider-kubernetes/commit/6e06b48b53e11c8de8dece93e4b9576edbc24fc8))
* **services:** add role service ([f802762](https://github.com/cloudgraphdev/cloudgraph-provider-kubernetes/commit/f8027623a8ec2ec6b987d389295f98af0adef20d))
* **services:** add secret service ([944b43c](https://github.com/cloudgraphdev/cloudgraph-provider-kubernetes/commit/944b43c9c1ca0f24cb340a6440047563cb8c00eb))
* **services:** add serviceAccount service and connections to namesapce ([e005f69](https://github.com/cloudgraphdev/cloudgraph-provider-kubernetes/commit/e005f693a219d721ca3a7efde0e49c19a705061b))
* **services:** Add services persistentVolume, persistentVolumeClaim, and storageClass ([fcd93e9](https://github.com/cloudgraphdev/cloudgraph-provider-kubernetes/commit/fcd93e93fb2ea60e854f90b093f7388becaadd4a))
* **services:** create Ingress service, update getData to allow passing context as file or config ([d7b7e07](https://github.com/cloudgraphdev/cloudgraph-provider-kubernetes/commit/d7b7e072324d96aff151dfe950de4117d232f9ec))
* **services:** create Service service ([8bd29c2](https://github.com/cloudgraphdev/cloudgraph-provider-kubernetes/commit/8bd29c25b3e55dc3d828cf65ab0ca6a3b558d722))
* **services:** finish format for deployment, rework pod utils for reuse ([d241381](https://github.com/cloudgraphdev/cloudgraph-provider-kubernetes/commit/d2413811f84c2dd99e8ca986fd8a344fa2ec8393))
