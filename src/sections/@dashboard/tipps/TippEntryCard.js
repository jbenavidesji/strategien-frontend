import PropTypes from 'prop-types';
import React from "react";
// @mui
import { styled } from '@mui/material/styles';
import {Box, Typography, Divider, Card} from '@mui/material';

const StyledDescription = styled('div')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 20,
}));

// ----------------------------------------------------------------------

TippEntryCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    savingAmount: PropTypes.string.isRequired,
    savingCO2: PropTypes.string.isRequired,
    assumption: PropTypes.string,
    sx: PropTypes.object,
};

export default function TippEntryCard({ title, description, savingAmount, savingCO2, assumption}) {
    return (
                <Card>
                    <Typography
                        variant="h5"
                        color="inherit"
                        sx={{
                            py: 2,
                            boxShadow: 0,
                            textAlign: 'center',
                        }}
                    >{title}
                    </Typography>

                    <StyledDescription>
                        <Box>
                            <Typography >{description}</Typography>
                        </Box>
                    </StyledDescription>

                    <StyledDescription>
                        <Box>
                            <Typography variant="subtitle1">{savingAmount}: {savingCO2} </Typography>
                            <Typography sx={{
                                fontSize: '14px',
                                color: '#666',
                            }}>{assumption}</Typography>
                        </Box>
                    </StyledDescription>
                </Card>
    );
}
