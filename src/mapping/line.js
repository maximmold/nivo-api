/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict'

const Joi = require('joi')
const { Line, curvePropKeys } = require('nivo')
const common = require('./common')

module.exports = {
    component: Line,
    schema: Joi.object().keys(
        Object.assign({}, common.dimensions, {
            // data
            data: Joi.array()
                .items(
                    Joi.object()
                        .keys({
                            id: Joi.string().required(),
                            data: Joi.array()
                                .items(
                                    Joi.object()
                                        .keys({
                                            x: Joi.alternatives()
                                                .try(Joi.string(), Joi.number())
                                                .required(),
                                            y: Joi.alternatives()
                                                .try(Joi.string(), Joi.number())
                                                .required(),
                                        })
                                        .unknown()
                                )
                                .min(2)
                                .required(),
                        })
                        .unknown()
                )
                .min(1)
                .required(),

            stacked: Joi.boolean(),
            curve: Joi.any().valid(curvePropKeys),

            // axes & grid
            axes: Joi.object(),
            //axisTop: PropTypes.object,
            //axisRight: PropTypes.object,
            //axisBottom: PropTypes.object,
            //axisLeft: PropTypes.object,
            enableGridX: Joi.boolean(),
            enableGridY: Joi.boolean(),

            // dots
            enableDots: Joi.boolean(),
            dotSize: Joi.number().min(0),
            dotColor: Joi.string(),
            dotBorderWidth: Joi.number().min(0),
            dotBorderColor: Joi.string(),
            enableDotLabel: Joi.boolean(),

            // markers
            markers: Joi.array().items(
                Joi.object().keys({
                    axis: Joi.any().valid(['x', 'y']).required(),
                    value: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
                    style: Joi.object(),
                })
            ),

            // theming
            colors: Joi.string(),
            colorBy: Joi.string(),
        })
    ),
    runtimeProps: ['width', 'height', 'colors', 'stacked'],
    defaults: {
        margin: { top: 40, right: 50, bottom: 40, left: 50 },
    },
}
