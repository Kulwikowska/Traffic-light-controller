var config = {};

config.port                  = process.env.npm_config_port || 3000;
config.lightControllerAdress = process.env.npm_config_light_controller_ip || '127.0.0.1:8080';
config.id                    = process.env.npm_config_id;

export default config;