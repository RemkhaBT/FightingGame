const backgrounds = {

//-----------------------------------------------------------------------------------------------

    DarkForest: {

        background: {
            framesMax: 1,
            framesHold: 1,
            scale: 1,
            offset: {
                x: 0,
                y: 0
            }
        }
    }
}

const characters = {

//-----------------------------------------------------------------------------------------------

    Samurai: {

        idle: {

            framesMax: 8,
            framesHold: 18,
            scale: 2,
            offset: {
                x: 0,
                y: 76
            },
            hitBox: {

                activeFrames: {
                    start: 1,
                    end: 8
                },

                ray1: {
                    x: 178,
                    y: 80,
                    width: 40,
                    height: 88
                }
            }
        },

        run: {

            framesMax: 8,
            framesHold: 18,
            scale: 2,
            offset: {
                x: 0,
                y: 76
            },
            hitBox: {

                activeFrames: {
                    start: 1,
                    end: 8
                },

                ray1: {
                    x: 178,
                    y: 80,
                    width: 40,
                    height: 88
                }
            }
        },

        jump: {

            framesMax: 2,
            framesHold: 24,
            scale: 2,
            offset: {
                x: 0,
                y: 76
            },
            hitBox: {

                activeFrames: {
                    start: 1,
                    end: 2
                },

                ray1: {
                    x: 178,
                    y: 80,
                    width: 40,
                    height: 88
                }
            }
        },

        fall: {

            framesMax: 2,
            framesHold: 24,
            scale: 2,
            offset: {
                x: 0,
                y: 76
            },
            hitBox: {

                activeFrames: {
                    start: 1,
                    end: 2
                },

                ray1: {
                    x: 178,
                    y: 80,
                    width: 40,
                    height: 88
                }
            }
        },

        hit: {

            framesMax: 4,
            framesHold: 24,
            scale: 2,
            offset: {
                x: 0,
                y: 76
            },
            hitBox: {

                activeFrames: {
                    start: 1,
                    end: 4
                },

                ray1: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                }
            }
        },

        death: {

            framesMax: 6,
            framesHold: 24,
            scale: 2,
            offset: {
                x: 0,
                y: 76
            },
            hitBox: {

                activeFrames: {
                    start: 1,
                    end: 6
                },

                ray1: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                }
            }
        },

        attack1: {

            framesMax: 6,
            framesHold: 24,
            scale: 2,
            offset: {
                x: 0,
                y: 76
            },
            hitBox: {

                activeFrames: {
                    start: 1,
                    end: 6
                },

                ray1: {
                    x: 178,
                    y: 80,
                    width: 40,
                    height: 88
                }
            },
            attackBox: {

                activeFrames: {
                    start: 5,
                    end: 6
                },

                ray1: {
                    x: 172,
                    y: 34,
                    width: 100,
                    height: 10
                },

                ray2: {
                    x: 212,
                    y: 44,
                    width: 110,
                    height: 105
                },
                ray3: {
                    x: 322,
                    y: 52,
                    width: 25,
                    height: 84
                },
                ray4: {
                    x: 347,
                    y: 72,
                    width: 20,
                    height: 43
                },
                ray5: {
                    x: 202,
                    y: 149,
                    width: 60,
                    height: 12
                }
            }
        }
    },

//-----------------------------------------------------------------------------------------------

    Ninja: {

        idle: {

            framesMax: 4,
            framesHold: 26,
            scale: 2,
            offset: {
                x: 0,
                y: 88
            },
            hitBox: {

                activeFrames: {
                    start: 1,
                    end: 4
                },

                ray1: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                }
            }
        },

        run: {

            framesMax: 8,
            framesHold: 18,
            scale: 2,
            offset: {
                x: 0,
                y: 88
            },
            hitBox: {

                activeFrames: {
                    start: 1,
                    end: 8
                },

                ray1: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                }
            }
        },

        jump: {

            framesMax: 2,
            framesHold: 24,
            scale: 2,
            offset: {
                x: 0,
                y: 88
            },
            hitBox: {

                activeFrames: {
                    start: 1,
                    end: 2
                },

                ray1: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                }
            }
        },

        fall: {

            framesMax: 2,
            framesHold: 24,
            scale: 2,
            offset: {
                x: 0,
                y: 88
            },
            hitBox: {

                activeFrames: {
                    start: 1,
                    end: 2
                },

                ray1: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                }
            }
        },

        attack1: {

            framesMax: 4,
            framesHold: 32,
            scale: 2,
            offset: {
                x: 0,
                y: 88
            },
            hitBox: {

                activeFrames: {
                    start: 1,
                    end: 4
                },

                ray1: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                }
            },
            attackBox: {

                activeFrames: {
                    start: 1,
                    end: 4
                },

                ray1: {
                    x: 50,
                    y: 0,
                    width: 0,
                    height: 0
                }
            }
        }
    }
}