/*
 * This file is part of the nivo project.
 *
 * (c) 2016-today Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict'

const Joi = require('joi')
const { Bar } = require('nivo')
const common = require('./common')

module.exports = {
    component: Bar,
    schema: Joi.object().keys(
        Object.assign({}, common.dimensions, common.axes, common.defs, common.fill, {
            // data
            data: Joi.array().min(1).required(),
            indexBy: Joi.string().required(),
            keys: Joi.array().sparse(false).min(1).unique().required(),

            groupMode: Joi.any().valid(['grouped', 'stacked']),
            layout: Joi.any().valid(['horizontal', 'vertical']),
            reverse: Joi.boolean(),

            minValue: Joi.alternatives().try(Joi.any().valid('auto'), Joi.number()).required(),
            maxValue: Joi.alternatives().try(Joi.any().valid('auto'), Joi.number()).required(),
            padding: Joi.number(),
            innerPadding: Joi.number(),

            borderRadius: Joi.number().min(0),
            borderWidth: Joi.number().min(0),
            borderColor: Joi.string(),

            // grid
            enableGridX: Joi.boolean(),
            enableGridY: Joi.boolean(),

            // labels
            enableLabel: Joi.boolean(),
            label: Joi.string(),
            labelSkipWidth: Joi.number(),
            labelSkipHeight: Joi.number(),
            labelLinkColor: Joi.string(),
            labelTextColor: Joi.string(),

            // theming
            colors: Joi.string(),
            colorBy: Joi.string(),
            markers: Joi.array().items(
                Joi.object().keys({
                    axis: Joi.any().valid(['x', 'y']).required(),
                    value: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
                    legend: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
                    legendOffsetY: Joi.number(),
                    legendOrientation: Joi.any().valid(['horizontal', 'vertical']).required(),
                    legendPosition: Joi.any()
                        .valid([
                            'top-left',
                            'top',
                            'top-right',
                            'right',
                            'bottom-right',
                            'bottom',
                            'bottom-left',
                            'left',
                        ])
                        .required(),
                    style: Joi.object(),
                })
            ),
            defs: Joi.array().items(
                Joi.object().keys({
                    id: Joi.string(),
                    type: Joi.string(),
                    background: Joi.string(),
                    color: Joi.string(),
                    size: Joi.number(),
                    padding: Joi.number(),
                    stagger: Joi.boolean(),
                    rotation: Joi.number(),
                    lineWidth: Joi.number(),
                    spacing: Joi.number(),
                })
            ),
            fill: Joi.array().items(
                Joi.object().keys({
                    id: Joi.string(),
                    match: Joi.object().keys({
                        id: Joi.string(),
                    }),
                })
            ),
        })
    ),
    runtimeProps: ['width', 'height', 'colors', 'groupMode'],
    defaults: {
        margin: { top: 40, right: 50, bottom: 40, left: 50 },
    },
}
